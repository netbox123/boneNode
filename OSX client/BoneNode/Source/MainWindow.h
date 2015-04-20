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
}


- (void) receiveMainNotification:(NSNotification *) notification;

@end


