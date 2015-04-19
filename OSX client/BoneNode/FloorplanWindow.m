//
//  FloorplanWindow.m
//  BoneNode
//
//  Created by Martijn Heeroma on 02-04-15.
//
//

#import "FloorplanWindow.h"
#import "PrefClockView.h"

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
                                             selector:@selector(receivesetBBBNotification:)
                                                 name:@"setBBBNotification"
                                               object:nil];
}

- (NSString *)appURL {
    return @"http://192.168.7.2:4000/xcode/floorplan/";
}

+ (BOOL)isSelectorExcludedFromWebScript:(SEL)aSelector { return NO; }

- (void)showMessage:(NSString *)message
{
    NSRunAlertPanel(@"Message from JavaScript", message, nil, nil, nil);
}

- (void) receivesetBBBNotification:(NSNotification *) notification
{
    if ([[notification name] isEqualToString:@"setBBBNotification"])
    {
        id win = [self.webView windowScriptObject];
        if ([[notification object] isEqualToString:@"setTimeDate"])
            [win evaluateWebScript:@"setBBBtime()"];
    }
    NSLog(@"%@", [notification object]);
}

- (void)showNotification:(NSString *)message
{
    NSString *nickSub = [[message componentsSeparatedByString:@";"] objectAtIndex:0];
    //NSString *titleSub = [[message componentsSeparatedByString:@";"] objectAtIndex:1];
    NSString *msgSub = [[message componentsSeparatedByString:@";"] objectAtIndex:2];
    //NSString *InfoSub = [titleSub stringByAppendingString:msgSub];
    
    NSUserNotification *notification = [[NSUserNotification alloc] init];
    [notification setTitle:nickSub];
    [notification setInformativeText:msgSub];
    [notification set_identityImageHasBorder:NO];
    [notification set_identityImage:[NSImage imageNamed:@"icon_32x32@2x.png"]];
    //[notification setSoundName:NSUserNotificationDefaultSoundName];
    
    NSUserNotificationCenter *center = [NSUserNotificationCenter defaultUserNotificationCenter];
    [center setDelegate:self];
    [center deliverNotification:notification];
}

- (void)pushAllValues:(NSString *)message
{
    NSString *timedateString = @"";
    NSArray * words = [message componentsSeparatedByString:@"*"];
    for (NSString * word in words){
        NSString *varid = [[word componentsSeparatedByString:@"#"] objectAtIndex:0];
        if ([varid  isEqual: @"1003"]){
            timedateString = [[word componentsSeparatedByString:@"#"] objectAtIndex:1];
        }
        if ([varid  isEqual: @"1004"]){
            timedateString = [timedateString stringByAppendingString: @"*"];
            timedateString = [timedateString stringByAppendingString: [[word componentsSeparatedByString:@"#"] objectAtIndex:1]];
        }
    }
    //NSLog(@"%@", timedateString);
    [[NSNotificationCenter defaultCenter]postNotificationName:@"timedateNotification" object:timedateString];
}

- (void)MAction01:(id)sender {
    id win = [self.webView windowScriptObject];
    [win evaluateWebScript:@"runActionID('1')"];
}

- (void)MAction02:(id)sender {
    id win = [self.webView windowScriptObject];
    [win evaluateWebScript:@"runActionID('2')"];
}

- (BOOL)userNotificationCenter:(NSUserNotificationCenter *)center shouldPresentNotification:(NSUserNotification *)notification
{
    return YES;
}

- (void)MenuUpdateDevices:(id)sender {
    id win = [self.webView windowScriptObject];
    [win evaluateWebScript:@"updateDevicesLayout()"];
    
    NSUserNotification *notification = [[NSUserNotification alloc] init];
    [notification setTitle:@"Hello Panda"];
    [notification setInformativeText:@"I love PandaBar!"];
    //[notification setSoundName:NSUserNotificationDefaultSoundName];
    
    NSUserNotificationCenter *center = [NSUserNotificationCenter defaultUserNotificationCenter];
    [center setDelegate:self];
    [center deliverNotification:notification];
}

- (void) dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    [super dealloc];
}

@end
