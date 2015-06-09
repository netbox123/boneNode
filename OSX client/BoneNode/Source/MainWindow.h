//
//  MainWindow.h
//  BoneNode
//
//  Created by Martijn Heeroma on 19-04-15.
//
//

#import <Cocoa/Cocoa.h>
#import "Reachability.h"

@class BrowserWindow;

@interface MainWindow : NSWindowController
{
    Reachability* internetReach;
    BrowserWindow *browserWindow;
    
    IBOutlet NSImageView* status;
    IBOutlet NSTextField *timeString;
    IBOutlet NSTextField *dateString;
    IBOutlet NSTextField *bmv_display;
    
    IBOutlet NSTextField *mt_BU;
    IBOutlet NSTextField *mt_KEL;
    IBOutlet NSTextField *mh_KEL;
    IBOutlet NSTextField *mt_WK;
    IBOutlet NSTextField *mt_K1;
    IBOutlet NSTextField *mt_K2;
    IBOutlet NSTextField *mt_B1;
    IBOutlet NSTextField *mt_B2;
    IBOutlet NSTextField *mt_B3;
    IBOutlet NSTextField *mt_G1;
    IBOutlet NSTextField *mt_G2;
    IBOutlet NSTextField *mbmv_v;
    IBOutlet NSTextField *mbmv_i;
    IBOutlet NSTextField *mbmv_p;
    IBOutlet NSTextField *mbmv_ce;
    IBOutlet NSTextField *mbmv_soc;
    
    IBOutlet NSTextField *d_id;
    IBOutlet NSTextField *d_name;
    IBOutlet NSTextField *d_type;
    IBOutlet NSTextField *d_opm;
    IBOutlet NSTextField *d_sort;
    IBOutlet NSTextField *d_val;
    IBOutlet NSTextField *d_re;
    IBOutlet NSTextField *d_dim;
    IBOutlet NSTextField *d_rgb;
    
    IBOutlet NSSlider *powerSlider;
    IBOutlet NSSlider *bufferSlider;
    IBOutlet NSSlider *kachelSlider;
    IBOutlet NSSlider *generatorSlider;
}

- (IBAction)d_on:(id)sender;
- (IBAction)d_off:(id)sender;
- (IBAction)d_toggle:(id)sender;

- (IBAction)action_new:(id)sender;
- (IBAction)action_edit:(id)sender;
- (IBAction)action_delete:(id)sender;

- (IBAction)event_new:(id)sender;
- (IBAction)event_edit:(id)sender;
- (IBAction)event_delete:(id)sender;

- (IBAction)timer_new:(id)sender;
- (IBAction)timer_edit:(id)sender;
- (IBAction)timer_delete:(id)sender;

@property (assign) IBOutlet NSTableView *deviceTableView;
@property (assign) IBOutlet NSTableView *actionTableView;
@property (assign) IBOutlet NSTableView *eventTableView;
@property (assign) IBOutlet NSTableView *timerTableView;
@property (assign) IBOutlet NSTableView *triggerTableView;
@property (assign) IBOutlet NSTableView *lcatTableView;
@property (assign) IBOutlet NSTableView *linkTableView;

@property (nonatomic, strong) NSMutableArray *deviceArray;
@property (nonatomic, strong) NSMutableArray *actionArray;
@property (nonatomic, strong) NSMutableArray *eventArray;
@property (nonatomic, strong) NSMutableArray *eventAllArray;
@property (nonatomic, strong) NSMutableArray *timerArray;
@property (nonatomic, strong) NSMutableArray *triggerArray;
@property (nonatomic, strong) NSMutableArray *lcatArray;
@property (nonatomic, strong) NSMutableArray *linkArray;
@property (nonatomic, strong) NSMutableArray *linkAllArray;

@property (nonatomic, strong) NSNumber *selectedActionId;
@property (nonatomic, strong) NSString *selectedActionName;
@property (nonatomic, strong) NSNumber *selectedEventId;
@property (nonatomic, strong) NSString *selectedEventName;
@property (nonatomic, strong) NSNumber *selectedTimerId;
@property (nonatomic, strong) NSString *selectedTimerName;
@property (nonatomic, strong) NSNumber *selectedTriggerId;
@property (nonatomic, strong) NSString *selectedTriggerName;
@property (nonatomic, strong) NSNumber *selectedLcatId;
@property (nonatomic, strong) NSString *selectedLcatName;
@property (nonatomic, strong) NSNumber *selectedLinkId;
@property (nonatomic, strong) NSString *selectedLinkName;

- (void) receiveMainNotification:(NSNotification *) notification;
- (void) loadActionsFromJS;

@end


