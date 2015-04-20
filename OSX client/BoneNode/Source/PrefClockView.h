//
//  PrefClockView.h
//  BoneNode
//
//  Created by Martijn Heeroma on 15-04-15.
//
//

#import <Cocoa/Cocoa.h>

@interface PrefClockView : NSViewController
{
    IBOutlet NSTextField *timeString;
    IBOutlet NSTextField *dateString;
}

- (IBAction)setTimeDateBut:(id)sender;

- (void) receivetimedateNotification:(NSNotification *) notification;
 

@end
