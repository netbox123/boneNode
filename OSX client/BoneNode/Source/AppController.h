//
//  AppController.h
//  BoneNode
//
//  Created by Martijn Heeroma on 02-04-15.
//
//

#import <Foundation/Foundation.h>
@class AboutController;
@class DownloadsController;
@class DeviceListWindow;
@class ActionListWindow;
@class FloorplanWindow;
@class PrefWindow;
@class MainWindow;
@class PrefClockView;

@interface AppController : NSObject {
@private
    DownloadsController *downloadsController;
    AboutController *aboutController;
    DeviceListWindow *devicelistWindow;
    ActionListWindow *actionlistWindow;
    FloorplanWindow *floorplanWindow;
    PrefWindow *prefwindow;
    MainWindow *mainwindow;
    PrefClockView *prefclockView;
}




- (IBAction)showDownloads:(id)sender;
- (IBAction)showAbout:(id)sender;
- (IBAction)showDeviceList:(id)sender;
- (IBAction)showActionList:(id)sender;
- (IBAction)showFloorplanWindow:(id)sender;
- (IBAction)showPreferences:(id)sender;
- (IBAction)showMainWindow:(id)sender;
- (IBAction)MenuAction01:(id)sender;
- (IBAction)MenuAction02:(id)sender;
- (IBAction)MenuUpdateDevices:(id)sender;


@end
