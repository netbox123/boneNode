//
//  AppDelegate.h
//  BoneNode
//
//  Created by Martijn Heeroma on 02-04-15.
//
//

#import <Cocoa/Cocoa.h>
#import "Reachability.h"

@interface AppDelegate : NSObject <NSApplicationDelegate>{
@private
  
    
    Reachability* internetReach;
}

@property (assign) IBOutlet NSWindow *window;


@end
