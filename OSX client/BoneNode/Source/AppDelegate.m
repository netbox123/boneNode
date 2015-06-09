//
//  AppDelegate.m
//  BoneNode
//
//  Created by Martijn Heeroma on 02-04-15.
//
//

#import "AppDelegate.h"

@implementation AppDelegate

@synthesize window;

- (void) updateInterfaceWithReachability: (Reachability*) curReach
{
    NetworkStatus netStatus = [curReach currentReachabilityStatus];
   // NSString* statusString= @"";
    switch (netStatus)
    {
        case NotReachable:
        {
            NSLog(@"No internet access!!");
            //statusString = @"No internet access!!";
            //status.image = [NSImage imageNamed: @"stop-32.png"] ;
            break;
        }
            
        case Reachable:
        {
            NSLog(@"Internet access available!!");
            //statusString= @"Internet connection available!";
            //status.image = [NSImage imageNamed: @"Airport.png"];
            break;
        }
    }
    //[statusText setStringValue:statusString];
    
}
//Called by Reachability whenever status changes.
- (void) reachabilityChanged: (NSNotification* )note
{
    Reachability* curReach = [note object];
    NSParameterAssert([curReach isKindOfClass: [Reachability class]]);
    
    [self updateInterfaceWithReachability: curReach];
}

- (void)applicationDidFinishLaunching:(NSNotification *)aNotification
{
    NSLog(@"applicationDidFinishLaunching");
    // Observe the kNetworkReachabilityChangedNotification. When that notification is posted, the
    // method "reachabilityChanged" will be called.
    [[NSNotificationCenter defaultCenter] addObserver: self selector: @selector(reachabilityChanged:) name: kReachabilityChangedNotification object: nil];
    
    
    internetReach = [[Reachability reachabilityWithHostName:@"192.168.7.2"] retain];
    [internetReach startNotifier];
    [self updateInterfaceWithReachability: internetReach];
    
}

- (void) dealloc
{
    [internetReach release];
    [super dealloc];
}

@end
