//
//  MS_EventNew.h
//  BoneNode
//
//  Created by Martijn Heeroma on 26-05-15.
//
//

#import <Cocoa/Cocoa.h>

@interface MS_EventNew : NSWindowController
    @property (assign) IBOutlet NSComboBox *Device;
    @property (assign) IBOutlet NSTextField *Action;
    @property (assign) IBOutlet NSTextField *Value;
    @property (assign) NSNumber *deviceID;
    @property (nonatomic, strong) NSArray *deviceArray;


@end
