//
//  FloorplanWindow.m
//  BoneNode
//
//  Created by Martijn Heeroma on 02-04-15.
//
//

#import "FloorplanWindow.h"
#import "PrefClockView.h"
#import "EDSunriseSet.h"

@interface FloorplanWindow ()


@end

@interface NSUserNotification (CFIPrivate)
- (void)set_identityImage:(NSImage *)image;
@end

@implementation FloorplanWindow

- (void)windowDidLoad {
    [super windowDidLoad];
    [self.webView  setMainFrameURL:[self appURL]];
    [[self.webView windowScriptObject] setValue:self forKey:@"app"];

    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(receivesendserialNotification:)
                                                 name:@"sendserialNotification"
                                               object:nil];
    
    
    
    NSString *tzStr = @"GMT02:00";
    NSTimeZone *tz = [[NSTimeZone alloc] initWithName:tzStr];
    EDSunriseSet *edSunriseSet = [EDSunriseSet sunrisesetWithTimezone:tz latitude:52.5078031 longitude:6.0561491 ];
    [edSunriseSet calculateSunriseSunset:[NSDate date]];
    //NSLog(@"%@, %@", edSunriseSet.localSunrise, edSunriseSet.localSunset);
}

- (NSString *)appURL {
    return @"http://192.168.7.2:4000/xcode/floorplan/";
}

+ (BOOL)isSelectorExcludedFromWebScript:(SEL)aSelector { return NO; }

- (void) receivesendserialNotification:(NSNotification *) notification
{
    if ([[notification name] isEqualToString:@"sendserialNotification"])
    {
        id win = [self.webView windowScriptObject];
        NSString* str = [notification object];
        NSString* startstr = @"SendDueSerial('";
        NSString* endstr = @"')";
        NSString* strRR = [NSString stringWithFormat:@"%@%@%@", startstr, str, endstr];
        [win evaluateWebScript:strRR ];
    }
    
}


- (void)showNotification:(NSString *)message
{
    NSString *msgTitle = [[message componentsSeparatedByString:@";"] objectAtIndex:0];
    NSString *msgInfo = [[message componentsSeparatedByString:@";"] objectAtIndex:1];
    NSUserDefaults *defaults =[NSUserDefaults standardUserDefaults];
    NSString *messagesEnabled =[defaults valueForKey:@"messagesEnabled"];
    if ([messagesEnabled isEqualToString:@"1"]){
        NSUserNotification *notification = [[NSUserNotification alloc] init];
        [notification setTitle:msgTitle];
        [notification setInformativeText:msgInfo];
        [notification set_identityImageHasBorder:NO];
        NSUserNotificationCenter *center = [NSUserNotificationCenter defaultUserNotificationCenter];
        [center setDelegate:self];
        [center deliverNotification:notification];
        [[NSNotificationCenter defaultCenter]postNotificationName:@"LogNotification" object:message];
    }
}

- (void)pushAllValues:(NSString *)message
{
    [[NSNotificationCenter defaultCenter]postNotificationName:@"timedateNotification" object:message];
    [[NSNotificationCenter defaultCenter]postNotificationName:@"MainNotification" object:message];
    
}

- (void)pushAllValues2:(NSString *)message
{
    [[NSNotificationCenter defaultCenter]postNotificationName:@"MemuletNotification" object:message];
    
}

- (void)deviceChange:(NSString *)message
{
    [[NSNotificationCenter defaultCenter]postNotificationName:@"deviceChangeNotification" object:message];
    //NSLog(@"%@", message);
}

- (void)serverUpdate:(NSString *)message 
{
    [[NSNotificationCenter defaultCenter]postNotificationName:@"serverUpdateNotification" object:message];
    //NSLog(@"%@", message);
}


- (BOOL)userNotificationCenter:(NSUserNotificationCenter *)center shouldPresentNotification:(NSUserNotification *)notification
{
    return YES;
}

- (void)MenuUpdateDevices:(id)sender {
    id win = [self.webView windowScriptObject];
    [win evaluateWebScript:@"updateLayoutAll()"];
}

- (void) dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    [super dealloc];
}

@end
