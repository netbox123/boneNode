//
//  MS_ActionEdit.h
//  BoneNode
//
//  Created by Martijn Heeroma on 25-05-15.
//
//

#import <Cocoa/Cocoa.h>

@interface MS_ActionEdit : NSWindowController
@property (assign) IBOutlet NSTextField *ActionName;
@property (nonatomic, strong) NSString *VarActionName;
@end
