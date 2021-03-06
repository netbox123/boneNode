//
//  AppController.h
//  BoneNode
//
//  Created by Martijn Heeroma on 02-04-15.
//
//

#import <Foundation/Foundation.h>
@class AboutController;
@class FloorplanWindow;
@class PrefWindow;
@class MainWindow;
@class PrefClockView;
@class BrowserWindow;
@class LogWindow;

@interface AppController : NSObject {
@private
    AboutController *aboutController;
    FloorplanWindow *floorplanWindow;
    PrefWindow *prefwindow;
    MainWindow *mainwindow;
    PrefClockView *prefclockView;
    BrowserWindow *browserWindow;
    LogWindow *logWindow;
}

- (IBAction)showAbout:(id)sender;
- (IBAction)showFloorplanWindow:(id)sender;
- (IBAction)showPreferences:(id)sender;
- (IBAction)showMainWindow:(id)sender;
- (IBAction)showBrowserWindow:(id)sender;
- (IBAction)showLogWindow:(id)sender;


@end
