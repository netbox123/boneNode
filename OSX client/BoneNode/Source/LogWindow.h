//
//  LogWindow.h
//  BoneNode
//
//  Created by Martijn Heeroma on 13-06-15.
//
//

#import <Cocoa/Cocoa.h>

@interface LogWindow : NSWindowController
@property (assign) IBOutlet NSTextView *TextView;
@property (nonatomic, strong) NSMutableArray *logArray;

@end
