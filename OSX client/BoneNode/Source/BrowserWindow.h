//
//  BrowserWindow.h
//  BoneNode
//
//  Created by Martijn Heeroma on 30-05-15.
//
//

#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h> 

@interface BrowserWindow : NSWindowController
@property (nonatomic, strong) NSString *VarWindowTitle;
@property (assign) IBOutlet id webView;

@property (assign) IBOutlet NSComboBox *Cat;
@property (assign) IBOutlet NSComboBox *Name;
@property (assign) IBOutlet NSTextField *Link;
@property (nonatomic, strong) NSString *VarCat;
@property (nonatomic, strong) NSString *VarName;
@property (nonatomic, strong) NSString *VarLink;

@property (nonatomic, strong) NSArray *catArray;
@property (nonatomic, strong) NSArray *linkArray;

@property (assign) NSNumber *linkID;
@property (assign) NSNumber *catID;
@end
