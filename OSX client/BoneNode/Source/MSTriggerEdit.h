//
//  MSTriggerEdit.h
//  BoneNode
//
//  Created by Martijn Heeroma on 29-05-15.
//
//

#import <Cocoa/Cocoa.h>

@interface MSTriggerEdit : NSWindowController
@property (assign) IBOutlet NSTextField *TriggerName;
@property (nonatomic, strong) NSString *VarTriggerName;
@end
