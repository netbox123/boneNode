//
//  ActionListWindow.m
//  BoneNode
//
//  Created by Martijn Heeroma on 02-04-15.
//
//

#import "ActionListWindow.h"


@interface ActionListWindow ()


@end

@implementation ActionListWindow

- (void)windowDidLoad {
    [super windowDidLoad];
    
    NSString *urlText = @"http://192.168.7.2:4000/xcode/actionlist/";
    [[self.webview mainFrame] loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:urlText]]];
}

@end
