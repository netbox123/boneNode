//
//  MainWindow.m
//  BoneNode
//
//  Created by Martijn Heeroma on 19-04-15.
//
//

#import "MainWindow.h"

@interface MainWindow ()

@end

@implementation MainWindow


- (void)windowDidLoad {
    [super windowDidLoad];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(receiveMainNotification:)
                                                 name:@"MainNotification"
                                               object:nil];
    //[timeString setStringValue:@"00:05:45"];
    //[dateString setStringValue:@"01-25-15"];
}


- (void) receiveMainNotification:(NSNotification *) notification
{

    NSArray * words = [[notification object] componentsSeparatedByString:@"*"];
    for (NSString * word in words){
        NSString *varid = [[word componentsSeparatedByString:@"#"] objectAtIndex:0];
        NSString *varvalue = [[word componentsSeparatedByString:@"#"] objectAtIndex:1];
        
        if ([varid  isEqual: @"1003"]){
            [timeString setStringValue:varvalue];
        }
        if ([varid  isEqual: @"1004"]){
            [dateString setStringValue:varvalue];
        }
        
        if ([varid  isEqual: @"3001"]){
            [bmv_v setStringValue:varvalue];
        }
        if ([varid  isEqual: @"3002"]){
            [bmv_i setStringValue:varvalue];
            [bmv_display setStringValue:varvalue];
        }
        if ([varid  isEqual: @"3003"]){
            [bmv_ce setStringValue:varvalue];
        }
        if ([varid  isEqual: @"3004"]){
            [bmv_soc setStringValue:varvalue];
        }
        if ([varid  isEqual: @"3005"]){
            [bmv_ttg setStringValue:varvalue];
        }
        if ([varid  isEqual: @"3006"]){
            [bmv_alarm setStringValue:varvalue];
        }
        if ([varid  isEqual: @"3007"]){
            [bmv_relay setStringValue:varvalue];
        }
        if ([varid  isEqual: @"3008"]){
            [bmv_p setStringValue:varvalue];
        }
    }
    //NSLog(@"%@", [notification object]);
}



- (void) dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    [super dealloc];
}



@end
