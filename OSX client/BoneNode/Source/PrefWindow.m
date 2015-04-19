//
//  PrefWindow.m
//  BoneNode
//
//  Created by Martijn Heeroma on 12-04-15.
//
//

#import "PrefWindow.h"
#import "PrefGeneralView.h"
#import "PrefClockView.h"

@interface PrefWindow ()

@end

@implementation PrefWindow

@synthesize myCurrentViewController;

- (void)windowDidLoad {
    [super windowDidLoad];
    
    // Implement this method to handle any initialization after your window controller's window has been loaded from its nib file.
}

- (void)awakeFromNib
{
    // start by displaying the CustomImageViewController
    [self showGeneral:self];
}

- (IBAction)showGeneral:(id)sender {
    [self willChangeValueForKey:@"viewController"];
    if ([self.myCurrentViewController view] != nil)
    {
        [[self.myCurrentViewController view] removeFromSuperview];	// remove the current view
    }
    _prefgeneralview = [[PrefGeneralView alloc] initWithNibName:@"PrefGeneralView" bundle:nil];
    myCurrentViewController = self.prefgeneralview;
    [myTargetView addSubview:[self.myCurrentViewController view]];
    [[self.myCurrentViewController view] setFrame:[myTargetView bounds]];
    NSLog(@"showGeneral");
}

- (IBAction)showClock:(id)sender{
    [self willChangeValueForKey:@"viewController"];
    if ([self.myCurrentViewController view] != nil)
    {
        [[self.myCurrentViewController view] removeFromSuperview];	// remove the current view
    }
    _prefclockview = [[PrefClockView alloc] initWithNibName:@"PrefClockView" bundle:nil];
    myCurrentViewController = self.prefclockview;
    [myTargetView addSubview:[self.myCurrentViewController view]];
    [[self.myCurrentViewController view] setFrame:[myTargetView bounds]];
    NSLog(@"showClock");
}


// -------------------------------------------------------------------------------
//	viewController
// -------------------------------------------------------------------------------
- (NSViewController *)viewController
{
    return self.myCurrentViewController;
}
// -------------------------------------------------------------------------------
//	dealloc
// -------------------------------------------------                               sa----------------------------- mmnm
- (void)dealloc
{
    [_prefgeneralview release];
    [super dealloc];
}

@end
