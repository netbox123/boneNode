//
//  MS_LcatEdit.h
//  BoneNode
//
//  Created by Martijn Heeroma on 29-05-15.
//
//

#import <Cocoa/Cocoa.h>

@interface MS_LcatEdit : NSWindowController
@property (assign) IBOutlet NSTextField *LcatName;
@property (nonatomic, strong) NSString *VarLcatName;
@end
