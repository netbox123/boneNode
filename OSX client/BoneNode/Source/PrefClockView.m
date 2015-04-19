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
    [timeString setStringValue:@"00:05:45"];
    [dateString setStringValue:@"01-25-15"];    
}


- (void) receivetimedateNotification:(NSNotification *) notification
{
    if ([[notification name] isEqualToString:@"timedateNotification"])
    {
        [timeString setStringValue:[[[notification object] componentsSeparatedByString:@"*"] objectAtIndex:0]];
        [dateString setStringValue:[[[notification object] componentsSeparatedByString:@"*"] objectAtIndex:1]];
    }
    //NSLog(@"%@", [notification object]);
}

- (IBAction)setTimeDateBut:(id)sender {
    NSLog(@"setBBBNotification");
    [[NSNotificationCenter defaultCenter]postNotificationName:@"setBBBNotification" object:@"setTimeDate"];
}


- (void) dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    [super dealloc];
}


@end
