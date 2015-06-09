//
//  MS_LinkNew.h
//  BoneNode
//
//  Created by Martijn Heeroma on 29-05-15.
//
//

#import <Cocoa/Cocoa.h>

@interface MS_LinkNew : NSWindowController
@property (assign) IBOutlet NSTextField *Name;
@property (assign) IBOutlet NSComboBox *Cat;
@property (assign) IBOutlet NSTextField *Link;
@property (nonatomic, strong) NSString *VarCat;
@property (assign) NSNumber *catID;
@property (nonatomic, strong) NSArray *catArray;
@end
