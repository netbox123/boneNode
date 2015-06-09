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

@interface AppController : NSObject {
@private
    AboutController *aboutController;
    FloorplanWindow *floorplanWindow;
    PrefWindow *prefwindow;
    MainWindow *mainwindow;
    PrefClockView *prefclockView;
    BrowserWindow *browserWindow;
}

- (IBAction)showAbout:(id)sender;
- (IBAction)MenuAction01:(id)sender;
- (IBAction)MenuAction02:(id)sender;
- (IBAction)showFloorplanWindow:(id)sender;
- (IBAction)showPreferences:(id)sender;
- (IBAction)showMainWindow:(id)sender;
- (IBAction)showBrowserWindow:(id)sender;


@end
