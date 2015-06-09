//
//  MS_LinkEdit.h
//  BoneNode
//
//  Created by Martijn Heeroma on 29-05-15.
//
//

#import <Cocoa/Cocoa.h>

@interface MS_LinkEdit : NSWindowController
@property (assign) IBOutlet NSComboBox *Cat;
@property (assign) IBOutlet NSTextField *Name;
@property (assign) IBOutlet NSTextField *Link;
@property (nonatomic, strong) NSString *VarCat;
@property (nonatomic, strong) NSString *VarName;
@property (nonatomic, strong) NSString *VarLink;

@property (assign) NSNumber *linkID;
@property (assign) NSNumber *catID;
@property (nonatomic, strong) NSArray *catArray;
@end
