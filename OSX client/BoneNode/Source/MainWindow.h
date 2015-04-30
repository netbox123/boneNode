//
//  MainWindow.h
//  BoneNode
//
//  Created by Martijn Heeroma on 19-04-15.
//
//

#import <Cocoa/Cocoa.h>



@interface MainWindow : NSWindowController
{
    IBOutlet NSTextField *timeString;
    IBOutlet NSTextField *dateString;
    IBOutlet NSTextField *bmv_v;
    IBOutlet NSTextField *bmv_i;
    IBOutlet NSTextField *bmv_p;
    IBOutlet NSTextField *bmv_ce;
    IBOutlet NSTextField *bmv_soc;
    IBOutlet NSTextField *bmv_ttg;
    IBOutlet NSTextField *bmv_alarm;
    IBOutlet NSTextField *bmv_relay;
    IBOutlet NSTextField *bmv_display;
    
    IBOutlet NSTextField *d_id;
    IBOutlet NSTextField *d_name;
    IBOutlet NSTextField *d_type;
    IBOutlet NSTextField *d_opm;
    IBOutlet NSTextField *d_sort;
    IBOutlet NSTextField *d_val;
    IBOutlet NSTextField *d_re;
    IBOutlet NSTextField *d_dim;
    IBOutlet NSTextField *d_rgb;
}

- (IBAction)d_on:(id)sender;
- (IBAction)d_off:(id)sender;
- (IBAction)d_toggle:(id)sender;

@property (assign) IBOutlet NSTableView *deviceTableView;
@property (assign) IBOutlet NSTableView *actionTableView;

@property (nonatomic, strong) NSArray *deviceArray;
@property (nonatomic, strong) NSArray *actionArray;

- (void) receiveMainNotification:(NSNotification *) notification;

@end


