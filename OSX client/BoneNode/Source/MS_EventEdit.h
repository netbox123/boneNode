//
//  MS_EventEdit.h
//  BoneNode
//
//  Created by Martijn Heeroma on 26-05-15.
//
//

#import <Cocoa/Cocoa.h>

@interface MS_EventEdit : NSWindowController
@property (assign) IBOutlet NSComboBox *Device;
@property (assign) IBOutlet NSTextField *Action;
@property (assign) IBOutlet NSTextField *Value;
@property (nonatomic, strong) NSString *VarDevice;
@property (nonatomic, strong) NSString *VarAction;
@property (nonatomic, strong) NSString *VarValue;

@property (assign) NSNumber *eventID;
@property (assign) NSNumber *deviceID;
@property (nonatomic, strong) NSArray *deviceArray;
@end
