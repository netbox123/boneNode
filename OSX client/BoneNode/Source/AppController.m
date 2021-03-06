//
//  AppController.m
//  BoneNode
//
//  Created by Martijn Heeroma on 02-04-15.
//
//

#import "AppController.h"
#import "AboutController.h"
#import "FloorplanWindow.h"
#import "PrefWindow.h"
#import "PrefClockView.h"
#import "PrefGeneralView.h"
#import "MainWindow.h"
#import "BrowserWindow.h"
#import "LogWindow.h"


@implementation AppController

- (id)init
{
    self = [super init];
    if (self) {
        if (!floorplanWindow) {
            floorplanWindow = [[FloorplanWindow alloc] initWithWindowNibName:@"FloorplanWindow"];}
        [floorplanWindow showWindow:self];}
    
        if (!mainwindow) {mainwindow = [[MainWindow alloc] initWithWindowNibName:@"MainWindow"];}
        [mainwindow showWindow:self];
    return self;
    
}

- (IBAction)showBrowserWindow:(id)sender {
    browserWindow = [[BrowserWindow alloc] initWithWindowNibName:@"BrowserWindow"];
    [browserWindow showWindow:self];
}

- (IBAction)showAbout:(id)sender {
    if (!aboutController) {
        aboutController = [[AboutController alloc] initWithWindowNibName:@"About"];}
    [aboutController showWindow:self];
}


- (IBAction)showFloorplanWindow:(id)sender {
    if (!floorplanWindow) {floorplanWindow = [[FloorplanWindow alloc] initWithWindowNibName:@"FloorplanWindow"];}
    [floorplanWindow showWindow:self];
}

- (IBAction)showPreferences:(id)sender {
    if (!prefwindow) {prefwindow = [[PrefWindow alloc] initWithWindowNibName:@"PrefWindow"];}
    [prefwindow showWindow:self];
}

- (IBAction)showMainWindow:(id)sender {
    if (!mainwindow) {mainwindow = [[MainWindow alloc] initWithWindowNibName:@"MainWindow"];}
    [mainwindow showWindow:self];
}

- (IBAction)showLogWindow:(id)sender {
    if (!logWindow) {logWindow = [[LogWindow alloc] initWithWindowNibName:@"LogWindow"];}
    [logWindow showWindow:self];
}


- (void)dealloc {[super dealloc];}

@end
