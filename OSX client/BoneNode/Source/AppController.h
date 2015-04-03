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

@interface AppController : NSObject {
@private
    DownloadsController *downloadsController;
    AboutController *aboutController;
    DeviceListWindow *devicelistWindow;
    ActionListWindow *actionlistWindow;
    FloorplanWindow *floorplanWindow;
}


- (IBAction)showDownloads:(id)sender;
- (IBAction)showAbout:(id)sender;
- (IBAction)showDeviceList:(id)sender;
- (IBAction)showActionList:(id)sender;
- (IBAction)showFloorplanWindow:(id)sender;

@end
