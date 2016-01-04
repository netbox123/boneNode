//
//  PrefClockView.m
//  BoneNode
//
//  Created by Martijn Heeroma on 15-04-15.
//
//

#import "PrefClockView.h"

@interface PrefClockView ()


@end

@implementation PrefClockView

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(receivetimedateNotification:)
                                                 name:@"timedateNotification"
                                               object:nil];
    
    NSUserDefaults *defaults =[NSUserDefaults standardUserDefaults]; 
    if([defaults valueForKey:@"tzone"] != nil){
        [lonString setStringValue:[defaults valueForKey:@"lon"]];
        [latString setStringValue:[defaults valueForKey:@"lat"]];
        [tzoneString setStringValue:[defaults valueForKey:@"tzone"]];
    }
    
}

- (void) receivetimedateNotification:(NSNotification *) notification
{
    //NSLog(@"receiveMainNotification%@", [notification object]);
    NSString *timedateString = @"";
    NSArray * words = [[notification object] componentsSeparatedByString:@"*"];
    for (NSString * word in words){
        NSString *varid = [[word componentsSeparatedByString:@"#"] objectAtIndex:0];
        if ([varid  isEqual: @"1003"]){
            [timeString setStringValue:[[word componentsSeparatedByString:@"#"] objectAtIndex:1]];
        }
        if ([varid  isEqual: @"1004"]){
            //timedateString = [timedateString stringByAppendingString: @"*"];
            [dateString setStringValue:[timedateString stringByAppendingString: [[word componentsSeparatedByString:@"#"] objectAtIndex:1]]];
        }
    }
    
}


- (IBAction)setTimeDateBut:(id)sender {
    double perciseTimeStamp = [[NSDate date] timeIntervalSince1970] + 2*3600;
    long long int intTimeStamp = (int)perciseTimeStamp;
    NSLog(@"setTimeDateBut button tapped %f",perciseTimeStamp);
    NSLog(@"setTimeDateBut button tapped %lld",intTimeStamp);
    NSString *str=@"http://192.168.7.2:4000/api/server?client_type=OSX%20Cient%200.23&";
    NSString *action=@"action=settime&var1=";
    NSString* strRR = [[NSString stringWithFormat:@"%@%@%lld", str, action, intTimeStamp]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    NSURL *url=[NSURL URLWithString:strRR];
    [NSData dataWithContentsOfURL:url];
}

- (IBAction)setLonLatBut:(id)sender {
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:[lonString stringValue] forKey:@"lon"];
    [defaults setObject:[latString stringValue] forKey:@"lat"];
    [defaults setObject:[tzoneString stringValue] forKey:@"tzone"];
    [defaults synchronize];
    [[NSNotificationCenter defaultCenter]postNotificationName:@"serverUpdateNotification" object:@"sunTimeSet"];
}

- (void) dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    [super dealloc];
}


@end
