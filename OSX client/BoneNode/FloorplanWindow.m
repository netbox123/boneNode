//
//  FloorplanWindow.m
//  BoneNode
//
//  Created by Martijn Heeroma on 02-04-15.
//
//

#import "FloorplanWindow.h"

@interface FloorplanWindow ()


@end

@implementation FloorplanWindow

- (void)windowDidLoad {
    [super windowDidLoad];
    
    NSString *urlText = @"http://192.168.7.2:4000/xcode/floorplan/";
    [[self.webview mainFrame] loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:urlText]]];
}

@end
