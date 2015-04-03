//
//  DeviceListController.m
//  BoneNode
//
//  Created by Martijn Heeroma on 01-03-15.
//
//

#import "DeviceListWindow.h"

@interface DeviceListWindow ()


@end

@implementation DeviceListWindow

- (void)windowDidLoad {
    [super windowDidLoad];
    
    NSString *urlText = @"http://192.168.7.2:4000/xcode/devicelist/";
    [[self.webview mainFrame] loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:urlText]]];
}

@end