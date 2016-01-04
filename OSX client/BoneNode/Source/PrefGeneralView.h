//
//  PrefGeneralView.h
//  BoneNode
//
//  Created by Martijn Heeroma on 15-04-15.
//
//

#import <Cocoa/Cocoa.h>

@interface PrefGeneralView : NSViewController

@property (assign) IBOutlet NSButton *MessagesEnable;
- (IBAction)setGeneralButt:(id)sender;

@end
