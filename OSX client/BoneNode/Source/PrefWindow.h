//
//  PrefWindow.h
//  BoneNode
//
//  Created by Martijn Heeroma on 12-04-15.
//
//

#import <Cocoa/Cocoa.h>

@class PrefGeneralView, PrefClockView;

@interface PrefWindow : NSWindowController
{
    IBOutlet NSView *myTargetView; // the host view
}

@property (nonatomic, assign) NSViewController *myCurrentViewController;
@property (nonatomic, strong) PrefGeneralView *prefgeneralview;
@property (nonatomic, strong) PrefClockView *prefclockview;


- (NSViewController *)viewController;

- (IBAction)showGeneral:(id)sender;
- (IBAction)showClock:(id)sender;



@end
