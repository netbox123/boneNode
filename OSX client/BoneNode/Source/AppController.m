//
//  AppController.m
//  BoneNode
//
//  Created by Martijn Heeroma on 02-04-15.
//
//

#import "AppController.h"
#import "DownloadsController.h"
#import "AboutController.h"
#import "DeviceListWindow.h"
#import "ActionListWindow.h"
#import "FloorplanWindow.h"
#import "PrefWindow.h"
#import "PrefClockView.h"
#import "PrefGeneralView.h"

@implementation AppController

- (id)init
{
    self = [super init];
    if (self) {
        if (!floorplanWindow) {
            floorplanWindow = [[FloorplanWindow alloc] initWithWindowNibName:@"FloorplanWindow"];}
        [floorplanWindow showWindow:self];}
    return self;
}

- (IBAction)showDownloads:(id)sender {
    if (!downloadsController) {
        downloadsController = [[DownloadsController alloc] initWithWindowNibName:@"Downloads"];}
    [downloadsController showWindow:self];
}

- (IBAction)showAbout:(id)sender {
    if (!aboutController) {
        aboutController = [[AboutController alloc] initWithWindowNibName:@"About"];}
    [aboutController showWindow:self];
}

- (IBAction)showDeviceList:(id)sender {
    if (!devicelistWindow) {
        devicelistWindow = [[DeviceListWindow alloc] initWithWindowNibName:@"DeviceList"];}
    [devicelistWindow showWindow:self];
}

- (IBAction)showActionList:(id)sender {
    if (!actionlistWindow) {
        actionlistWindow = [[ActionListWindow alloc] initWithWindowNibName:@"ActionListWindow"];}
    [actionlistWindow showWindow:self];
}

- (IBAction)showFloorplanWindow:(id)sender {
    if (!floorplanWindow) {floorplanWindow = [[FloorplanWindow alloc] initWithWindowNibName:@"FloorplanWindow"];}
    [floorplanWindow showWindow:self];
}

- (IBAction)showPreferences:(id)sender {
    if (!prefwindow) {prefwindow = [[PrefWindow alloc] initWithWindowNibName:@"PrefWindow"];}
    [prefwindow showWindow:self];
}

- (IBAction)MenuAction01:(id)sender {[floorplanWindow MAction01:self];}
- (IBAction)MenuAction02:(id)sender {[floorplanWindow MAction02:self];}
- (IBAction)MenuUpdateDevices:(id)sender {[floorplanWindow MenuUpdateDevices:self];}


- (void)dealloc {[super dealloc];}

@end
