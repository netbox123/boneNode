//
//  MainWindow.m
//  BoneNode
//
//  Created by Martijn Heeroma on 19-04-15.
//
//

#import "MainWindow.h"




#import "MS_ActionNew.h"
#import "MS_ActionEdit.h"
#import "MS_ActionDelete.h"
#import "MS_EventNew.h"
#import "MS_EventEdit.h"
#import "MS_EventDelete.h"
#import "MS_TimerNew.h"
#import "MS_TimerEdit.h"
#import "MS_TimerDelete.h"
#import "MSTriggerNew.h"
#import "MSTriggerEdit.h"
#import "MSTriggerDelete.h"
#import "MS_LcatNew.h"
#import "MS_LcatEdit.h"
#import "MS_LcatDelete.h"
#import "MS_LinkNew.h"
#import "MS_LinkEdit.h"
#import "MS_LinkDelete.h"
#import "BrowserWindow.h"

@interface MainWindow ()

@property (strong) MS_ActionNew *myMS_ActionNew;
@property (strong) MS_ActionEdit *myMS_ActionEdit;
@property (strong) MS_ActionDelete *myMS_ActionDelete;
@property (strong) MS_EventNew *myMS_EventNew;
@property (strong) MS_EventEdit *myMS_EventEdit;
@property (strong) MS_EventDelete *myMS_EventDelete;
@property (strong) MS_TimerNew *myMS_TimerNew;
@property (strong) MS_TimerEdit *myMS_TimerEdit;
@property (strong) MS_TimerDelete *myMS_TimerDelete;
@property (strong) MSTriggerNew *myMS_TriggerNew;
@property (strong) MSTriggerEdit *myMS_TriggerEdit;
@property (strong) MSTriggerDelete *myMS_TriggerDelete;
@property (strong) MS_LcatNew *myMS_LcatNew;
@property (strong) MS_LcatEdit *myMS_LcatEdit;
@property (strong) MS_LcatDelete *myMS_LcatDelete;
@property (strong) MS_LinkNew *myMS_LinkNew;
@property (strong) MS_LinkEdit *myMS_LinkEdit;
@property (strong) MS_LinkDelete *myMS_LinkDelete;
@end

@implementation MainWindow

@synthesize deviceArray;
@synthesize actionArray;
@synthesize eventArray;
@synthesize timerArray;
@synthesize triggerArray;
@synthesize lcatArray;
@synthesize linkArray;
@synthesize linkAllArray;
@synthesize deviceTableView;
@synthesize actionTableView;
@synthesize eventTableView;
@synthesize timerTableView;
@synthesize triggerTableView;
@synthesize lcatTableView;
@synthesize linkTableView;

- (void)windowWillLoad {
    [self loadDevicesFromJS];
    [self loadActionsFromJS];
    [self loadEventsFromJS];
    [self loadTimersFromJS];
    [self loadTriggersFromJS];
    [self loadLcatsFromJS];
    
    self.selectedActionId = [[self.actionArray objectAtIndex:0]objectForKey:@"id"];
    self.selectedLcatId = [[self.lcatArray objectAtIndex:0]objectForKey:@"id"];
    [self loadLinksFromJS];
    NSLog(@"selectedLcatId%@", self.selectedLcatId);
}

- (void)windowDidLoad {
    [super windowDidLoad];
    [[NSNotificationCenter defaultCenter] addObserver: self
                                             selector: @selector(reachabilityChanged:)
                                                 name: kReachabilityChangedNotification
                                               object: nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(receiveMainNotification:)
                                                 name:@"MainNotification"
                                               object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(receivedeviceChangeNotification:)
                                                 name:@"deviceChangeNotification"
                                               object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(receiveserverUpdateNotification:)
                                                 name:@"serverUpdateNotification"
                                               object:nil];
    
    [d_name setStringValue:[[self.deviceArray objectAtIndex:0]objectForKey:@"name"]];
    [d_id setStringValue:[[self.deviceArray objectAtIndex:0]objectForKey:@"id"]];
    [d_type setStringValue:[[self.deviceArray objectAtIndex:0]objectForKey:@"type"]];
    [d_opm setStringValue:[[self.deviceArray objectAtIndex:0]objectForKey:@"opm"]];
    [d_sort setStringValue:[[self.deviceArray objectAtIndex:0]objectForKey:@"sort"]];
    [d_val setStringValue:[[self.deviceArray objectAtIndex:0]objectForKey:@"val"]];
    [d_re  setStringValue:[[self.deviceArray objectAtIndex:0]objectForKey:@"re"]];
    [d_dim setStringValue:[[self.deviceArray objectAtIndex:0]objectForKey:@"isdim"]];
    [d_rgb setStringValue:[[self.deviceArray objectAtIndex:0]objectForKey:@"rgb"]];
}

- (void) receiveserverUpdateNotification:(NSNotification *) notification
{
    NSString *dbTable = [notification object];
    if ([dbTable isEqualTo: @"device"]){
        [self loadDevicesFromJS];
        [self.deviceTableView reloadData];
    } else if ([dbTable isEqualTo: @"action"]){
        [self loadActionsFromJS];
        [self.actionTableView reloadData];
    } else if ([dbTable isEqualTo: @"event"]){
        NSLog(@"update event from server");
        [self loadEventsFromJS];
        [self.eventTableView reloadData];
    } else if ([dbTable isEqualTo: @"timer"]){
        NSLog(@"update timer from server");
        [self loadTimersFromJS];
        [self.timerTableView reloadData];
    } else if ([dbTable isEqualTo: @"trigger"]){
        NSLog(@"update trigger from server");
        [self loadTriggersFromJS];
        [self.triggerTableView reloadData];
    } else if ([dbTable isEqualTo: @"lcat"]){
        NSLog(@"update lcat from server");
        [self loadLcatsFromJS];
        [self.lcatTableView reloadData];
    } else if ([dbTable isEqualTo: @"link"]){
        NSLog(@"update link from server");
        [self loadLinksFromJS];
        [self.linkTableView reloadData];
    }

}

- (void) receivedeviceChangeNotification:(NSNotification *) notification
{
    
    NSString *varid = [[[notification object] componentsSeparatedByString:@"-"] objectAtIndex:0];
    //NSString *varaction = [[[notification object] componentsSeparatedByString:@"-"] objectAtIndex:1];
    NSString *varvalue = [[[notification object] componentsSeparatedByString:@"-"] objectAtIndex:2];
    //NSLog(@"%@", varid);
    //NSLog(@"%@", varvalue);
    NSMutableArray *devArray = [[NSMutableArray alloc] init];
    devArray = self.deviceArray;
    for(int i=0;i<[devArray count];i++)
    {
        NSString *tempstring = [NSString stringWithFormat:@"%@",[[devArray objectAtIndex:i]objectForKey:@"id"]];
        //NSLog(@"%@", [[devArray objectAtIndex:i]objectForKey:@"id"]);
        if ([tempstring isEqualTo: varid])
        {
            [[devArray objectAtIndex:i] setObject: varvalue forKey: @"val"];
            NSString* device_id = [d_id stringValue];
            if ([device_id  isEqualTo: varid])
            {
                [d_val setStringValue:varvalue];
            }
        }
    }
    
    self.deviceArray = devArray;
    [self.deviceTableView reloadData];
}

- (void) receiveMainNotification:(NSNotification *) notification
{

    NSArray * words = [[notification object] componentsSeparatedByString:@"*"];
    for (NSString * word in words){
        NSString *varid = [[word componentsSeparatedByString:@"#"] objectAtIndex:0];
        NSString *varvalue = [[word componentsSeparatedByString:@"#"] objectAtIndex:1];
        if ([varid  isEqual: @"1003"]){[timeString setStringValue:varvalue];}
        if ([varid  isEqual: @"1004"]){[dateString setStringValue:varvalue];}
        NSString* displStr = [NSString stringWithFormat:@"%@%@", varvalue, @" V"];
        if ([varid  isEqual: @"3001"]){[mbmv_v setStringValue:displStr];}
        displStr = [NSString stringWithFormat:@"%@%@", varvalue, @" A"];
        if ([varid  isEqual: @"3002"]){[mbmv_i setStringValue:displStr];[bmv_display setStringValue:displStr];}
        displStr = [NSString stringWithFormat:@"%@%@", varvalue, @" Ah"];
        if ([varid  isEqual: @"3003"]){[mbmv_ce setStringValue:displStr];}
        displStr = [NSString stringWithFormat:@"%@%@", varvalue, @" %"];
        if ([varid  isEqual: @"3004"]){[mbmv_soc setStringValue:displStr];[powerSlider setFloatValue: [varvalue intValue]];}
        displStr = [NSString stringWithFormat:@"%@%@", varvalue, @" W"];
        if ([varid  isEqual: @"3008"]){[mbmv_p setStringValue:displStr];}
        displStr = [NSString stringWithFormat:@"%@%@", varvalue, @" ˚RF"];
        if ([varid  isEqual: @"4021"]){[mh_KEL setStringValue:displStr];}
        displStr = [NSString stringWithFormat:@"%@%@", varvalue, @" ˚C"];
        if ([varid  isEqual: @"4020"]){[mt_KEL setStringValue:displStr];}
        if ([varid  isEqual: @"4002"]){[mt_K1 setStringValue:displStr];[kachelSlider setFloatValue: [varvalue intValue]];}
        if ([varid  isEqual: @"4003"]){[mt_K2 setStringValue:displStr];}
        if ([varid  isEqual: @"4004"]){[mt_B1 setStringValue:displStr];[bufferSlider setFloatValue: [varvalue intValue]];}
        if ([varid  isEqual: @"4005"]){[mt_B2 setStringValue:displStr];}
        if ([varid  isEqual: @"4006"]){[mt_B3 setStringValue:displStr];}
        if ([varid  isEqual: @"4009"]){[mt_G2 setStringValue:displStr];}
        if ([varid  isEqual: @"4008"]){[mt_BU setStringValue:displStr];}
        if ([varid  isEqual: @"4007"]){[mt_G1 setStringValue:displStr];[generatorSlider setFloatValue: [varvalue intValue]];}
        if ([varid  isEqual: @"4001"]){[mt_WK setStringValue:displStr];}
    }
    //NSLog(@"%@", [notification object]);
}

- (void) updateInterfaceWithReachability: (Reachability*) curReach
{
    NetworkStatus netStatus = [curReach currentReachabilityStatus];
    // NSString* statusString= @"";
    switch (netStatus)
    {
        case NotReachable:
        {
            NSLog(@"No net access!!");
            //statusString = @"No internet access!!";
            status.image = [NSImage imageNamed: @"stop-32.png"] ;
            break;
        }
            
        case Reachable:
        {
            NSLog(@"Internet net available!!");
            //statusString= @"Internet connection available!";
            status.image = [NSImage imageNamed: @"Airport.png"];
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

//   -------------- TableViews --------------

- (NSInteger)numberOfRowsInTableView:aTableView {
    if (aTableView == deviceTableView) return [deviceArray count];
    else if (aTableView == actionTableView) return [actionArray count];
    else if (aTableView == eventTableView) return [eventArray count];
    else if (aTableView == timerTableView) return [timerArray count];
    else if (aTableView == triggerTableView) return [triggerArray count];
    else if (aTableView == lcatTableView) return [lcatArray count];
    else if (aTableView == linkTableView) return [linkArray count];
    return 0;
}

- (id)tableView:(NSTableView *)aTableView objectValueForTableColumn:(NSTableColumn *)tableColumn row:(NSInteger)row {
    if (aTableView == deviceTableView) {
        if ([tableColumn.identifier isEqualToString:@"id"]) {  //  colum (id)
            return [NSString stringWithFormat:@"%@",[[self.deviceArray objectAtIndex:row]objectForKey:@"id"]];
        } else if ([tableColumn.identifier isEqualToString:@"name"]) {  //  column (name)
            return [[self.deviceArray objectAtIndex:row]objectForKey:@"name"];
        } else if ([tableColumn.identifier isEqualToString:@"val"]) {  //  column (val)
            return [[self.deviceArray objectAtIndex:row]objectForKey:@"val"];
        } else if ([tableColumn.identifier isEqualToString:@"re"]) {  //  column (re)
            return [[self.deviceArray objectAtIndex:row]objectForKey:@"re"];
        } else if ([tableColumn.identifier isEqualToString:@"location"]) {  //  column (loc)
            return [[self.deviceArray objectAtIndex:row]objectForKey:@"loc"];
        } else if ([tableColumn.identifier isEqualToString:@"type"]) {  //  column (type)
            return [[self.deviceArray objectAtIndex:row]objectForKey:@"opm"];
        } else if ([tableColumn.identifier isEqualToString:@"img"]) {  //  column (img)
            NSNumber *temp = (NSNumber *)[[self.deviceArray objectAtIndex:row]objectForKey:@"val"];
            NSNumber *temptype = (NSNumber *)[[self.deviceArray objectAtIndex:row]objectForKey:@"type"];
            if ([temptype intValue] == 1){
                if ([temp intValue] == 0){
                    NSImage* img=[NSImage imageNamed:@"IDPNG_Light_Off@2x.png"];
                    return img;
                }else {
                    NSImage* img=[NSImage imageNamed:@"IDPNG_Light_On@2x.png"];
                    return img;
                }
            }else if ([temptype intValue] == 3){
                if ([temp intValue] == 0){
                    NSImage* img=[NSImage imageNamed:@"IDPNG_Device_Off@2x.png"];
                    return img;
                }else {
                    NSImage* img=[NSImage imageNamed:@"IDPNG_Device_On@2x.png"];
                    return img;
                }
            } else {
                return nil;
            }
        }
    } else if (aTableView == actionTableView) {
        if ([tableColumn.identifier isEqualToString:@"id"]) {  // first colum (id)
            return [[self.actionArray objectAtIndex:row]objectForKey:@"id"];
        } else if ([tableColumn.identifier isEqualToString:@"img"]) {  //  column (img)
            NSImage* img=[NSImage imageNamed:@"IDPNG_Light_Off@2x.png"];
            return img;
        } else if ([tableColumn.identifier isEqualToString:@"name"]) {  //  column (name)
            return [[self.actionArray objectAtIndex:row]objectForKey:@"name"];
        } else {
            return nil;
        }
        
    } else if (aTableView == eventTableView) {
        if ([tableColumn.identifier isEqualToString:@"id"]) {  // first colum (id)
            return [[self.eventArray objectAtIndex:row]objectForKey:@"id"];
        } else if ([tableColumn.identifier isEqualToString:@"img"]) {  //  column (img)
            NSImage* img=[NSImage imageNamed:@"IDPNG_Light_Off@2x.png"];
            return img;
        } else if ([tableColumn.identifier isEqualToString:@"name"]) {  //  column (name)
            for(int i=0;i<[self.deviceArray count];i++)
            {
                if ([[self.eventArray objectAtIndex:row]objectForKey:@"device_id"] == [[self.deviceArray objectAtIndex:i]objectForKey:@"id"]){
                    return [[self.deviceArray objectAtIndex:i]objectForKey:@"name"];
                }
            }
        } else if ([tableColumn.identifier isEqualToString:@"val"]) {  //  column (val)
        return [[self.eventArray objectAtIndex:row]objectForKey:@"value"];
        } else if ([tableColumn.identifier isEqualToString:@"action"]) {  //  column (action)
        return [[self.eventArray objectAtIndex:row]objectForKey:@"action"];
        }
    } else if (aTableView == timerTableView) {
        if ([tableColumn.identifier isEqualToString:@"time"]) {  // first colum (time)
            int secInt = [[[self.timerArray objectAtIndex:row]objectForKey:@"time"]intValue];
            int hourInt = secInt/3600;
            int minInt = (secInt - hourInt * 3600)/60;
            if (minInt < 10){
                return [NSString stringWithFormat:@"%d:0%d ", hourInt, minInt];
            } else {
                return [NSString stringWithFormat:@"%d:%d ", hourInt, minInt];
            }
            
        } else if ([tableColumn.identifier isEqualToString:@"img"]) {  //  column (img)
            NSImage* img=[NSImage imageNamed:@"IDPNG_Light_Off@2x.png"];
            return img;
        } else if ([tableColumn.identifier isEqualToString:@"name"]) {  //  column (name)
            return [[self.timerArray objectAtIndex:row]objectForKey:@"name"];
        } else if ([tableColumn.identifier isEqualToString:@"action"]) {  //  column (action)
            for (int i = 0; i < [self.actionArray count]; ++i)
            {
                if ([[self.actionArray objectAtIndex:i]objectForKey:@"id"] == [[self.timerArray objectAtIndex:row]objectForKey:@"action_id"]){
                    return [[self.actionArray objectAtIndex:i]objectForKey:@"name"];
                }
            }
        } else if ([tableColumn.identifier isEqualToString:@"enabled"]) {  //  column (enabled)
            
        
            if ([[[self.timerArray objectAtIndex:row]objectForKey:@"enable"] intValue]==1){
                NSImage* img=[NSImage imageNamed:@"Check_on.png"];
                return img;
            }else {
                NSImage* img=[NSImage imageNamed:@"Check_off.png"];
                return img;
            }
        } else if ([tableColumn.identifier isEqualToString:@"M"]) {  //  column (M)
            NSImage* img=[NSImage imageNamed:@"Check_on.png"];
            return img;
        } else if ([tableColumn.identifier isEqualToString:@"T"]) {  //  column (T)
            NSImage* img=[NSImage imageNamed:@"Check_off.png"];
            return img;
        } else if ([tableColumn.identifier isEqualToString:@"W"]) {  //  column (W)
            NSImage* img=[NSImage imageNamed:@"Check_on.png"];
            return img;
        } else if ([tableColumn.identifier isEqualToString:@"Th"]) {  //  column (Th)
            NSImage* img=[NSImage imageNamed:@"Check_on.png"];
            return img;
        }
        
    } else if (aTableView == triggerTableView) {
        if ([tableColumn.identifier isEqualToString:@"id"]) {  // first colum (id)
            return [[self.triggerArray objectAtIndex:row]objectForKey:@"id"];
        } else if ([tableColumn.identifier isEqualToString:@"img"]) {  //  column (img)
            NSImage* img=[NSImage imageNamed:@"IDPNG_Light_Off@2x.png"];
            return img;
        } else if ([tableColumn.identifier isEqualToString:@"name"]) {  //  column (name)
            return [[self.triggerArray objectAtIndex:row]objectForKey:@"name"];
        } else {
            return nil;
        }
    } else if (aTableView == lcatTableView) {
        if ([tableColumn.identifier isEqualToString:@"id"]) {  // first colum (id)
            return [[self.lcatArray objectAtIndex:row]objectForKey:@"id"];
        } else if ([tableColumn.identifier isEqualToString:@"img"]) {  //  column (img)
            NSImage* img=[NSImage imageNamed:@"IDPNG_Light_Off@2x.png"];
            return img;
        } else if ([tableColumn.identifier isEqualToString:@"name"]) {  //  column (name)
            return [[self.lcatArray objectAtIndex:row]objectForKey:@"name"];
        } else {
            return nil;
        }
    } else if (aTableView == linkTableView) {
        if ([tableColumn.identifier isEqualToString:@"id"]) {  // first colum (id)
            return [[self.linkArray objectAtIndex:row]objectForKey:@"id"];
        } else if ([tableColumn.identifier isEqualToString:@"img"]) {  //  column (img)
            NSImage* img=[NSImage imageNamed:@"IDPNG_Light_Off@2x.png"];
            return img;
        } else if ([tableColumn.identifier isEqualToString:@"name"]) {  //  column (name)
            return [[self.linkArray objectAtIndex:row]objectForKey:@"name"];
        } else {
            return nil;
        }
    } else {
        return nil;
    }
}

- (void)tableView:(NSTableView *)aTableView sortDescriptorsDidChange:(NSArray *)oldDescriptors
{
    if (aTableView == deviceTableView) {
        [self.deviceArray sortUsingDescriptors: [aTableView sortDescriptors]];
        [aTableView reloadData];
    } else if (aTableView == actionTableView) {
        [self.actionArray sortUsingDescriptors: [aTableView sortDescriptors]];
        [aTableView reloadData];
    }
}

- (void)tableViewSelectionDidChange:(NSNotification *)notification {
    NSTableView *aTableView = notification.object;
    if (aTableView == deviceTableView) {
        [d_name setStringValue:[[self.deviceArray objectAtIndex:aTableView.selectedRow]objectForKey:@"name"]];
        [d_id setStringValue:[[self.deviceArray objectAtIndex:aTableView.selectedRow]objectForKey:@"id"]];
        [d_type setStringValue:[[self.deviceArray objectAtIndex:aTableView.selectedRow]objectForKey:@"type"]];
        [d_opm setStringValue:[[self.deviceArray objectAtIndex:aTableView.selectedRow]objectForKey:@"opm"]];
        [d_sort setStringValue:[[self.deviceArray objectAtIndex:aTableView.selectedRow]objectForKey:@"sort"]];
        [d_val setStringValue:[[self.deviceArray objectAtIndex:aTableView.selectedRow]objectForKey:@"val"]];
        [d_re  setStringValue:[[self.deviceArray objectAtIndex:aTableView.selectedRow]objectForKey:@"re"]];
        [d_dim setStringValue:[[self.deviceArray objectAtIndex:aTableView.selectedRow]objectForKey:@"isdim"]];
        [d_rgb setStringValue:[[self.deviceArray objectAtIndex:aTableView.selectedRow]objectForKey:@"rgb"]];
        //NSLog(@"Device row %ld", (long)aTableView.selectedRow);
        
    } else if (aTableView == actionTableView) {
        self.selectedActionId = [[self.actionArray objectAtIndex:aTableView.selectedRow]objectForKey:@"id"];
        NSMutableArray *_eventArray = [[NSMutableArray alloc] init];
        for(int i=0;i<[self.eventAllArray count];i++)
        {
            NSNumber *temp = (NSNumber *)[[self.eventAllArray objectAtIndex:i]objectForKey:@"action_id"];
            //NSLog(@"selectedActionId %@",self.selectedActionId );
            if (temp == self.selectedActionId)
            {
                [_eventArray addObject:[self.eventAllArray objectAtIndex:i]]; 
            }
        }
        self.eventArray = _eventArray;
        [eventTableView reloadData];
        //self.selectedEventId = [[self.eventArray objectAtIndex:0]objectForKey:@"id"];
        //NSLog(@"count %lu",(unsigned long)[self.eventArray count] );
    } else if (aTableView == eventTableView) {
        if(aTableView.selectedRow>-1){
            self.selectedEventId = [[self.eventArray objectAtIndex:aTableView.selectedRow]objectForKey:@"id"];
        }
    } else if (aTableView == lcatTableView) {
        self.selectedLcatId = [[self.lcatArray objectAtIndex:aTableView.selectedRow]objectForKey:@"id"];
        NSLog(@"selectedLcatId %@",self.selectedLcatId );
        NSMutableArray *_linkArray = [[NSMutableArray alloc] init];
        for(int i=0;i<[self.linkAllArray count];i++)
        {
            NSNumber *temp = (NSNumber *)[[self.linkAllArray objectAtIndex:i]objectForKey:@"cat"];
            //NSLog(@"selectedLcatId %@",self.selectedLcatId );
            if (temp == self.selectedLcatId)
            {
                [_linkArray addObject:[self.linkAllArray objectAtIndex:i]];
            }
        }
        self.linkArray = _linkArray;
        [linkTableView reloadData];
        //self.selectedEventId = [[self.linkArray objectAtIndex:0]objectForKey:@"id"];
        //NSLog(@"count %lu",(unsigned long)[self.linkArray count] );
    } else if (aTableView == linkTableView) {
        if(aTableView.selectedRow>-1){
            self.selectedLinkId = [[self.linkArray objectAtIndex:aTableView.selectedRow]objectForKey:@"id"];
        }
        
    } else if (aTableView == timerTableView) {
        if(aTableView.selectedRow>-1){
            self.selectedTimerId = [[self.timerArray objectAtIndex:aTableView.selectedRow]objectForKey:@"id"];
        }
        
    } else if (aTableView == triggerTableView) {
        if(aTableView.selectedRow>-1){
            self.selectedTriggerId = [[self.triggerArray objectAtIndex:aTableView.selectedRow]objectForKey:@"id"];
        }
        
    }
}

//   --------------  Action --------------

- (void) loadActionsFromJS  
{
    NSLog(@"loadActionsFromJS");
    NSString *str=@"http://192.168.7.2:4000/actionJSON";
    NSURL *url=[NSURL URLWithString:str];
    NSData *data=[NSData dataWithContentsOfURL:url];
    NSError *jsonError = nil;
    NSMutableArray *JSONarray = [NSJSONSerialization JSONObjectWithData: data options: NSJSONReadingMutableContainers error: &jsonError];
    self.actionArray = JSONarray;
}

- (IBAction)action_run:(id)sender {

    NSString *str=@"http://192.168.7.2:4000/api/action?client_type=OSX%20Cient%200.23&";
    NSString *action=@"action=run&name=";
    NSString *name= [[self.actionArray objectAtIndex:[self.actionTableView selectedRow]]objectForKey:@"name"];
    NSString *str2= @"&id=";
    NSNumber *recid= [[self.actionArray objectAtIndex:[self.actionTableView selectedRow]]objectForKey:@"id"];
    NSString* strRR = [[NSString stringWithFormat:@"%@%@%@%@%@", str, action, name, str2, recid]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    NSURL *url=[NSURL URLWithString:strRR];
    [NSData dataWithContentsOfURL:url];
    NSLog(@"run url %@",strRR);
}

- (IBAction)action_new:(id)sender {
    //NSLog(@"action_new");
    self.myMS_ActionNew = [[MS_ActionNew alloc] initWithWindowNibName:@"MS_ActionNew"];
    [self.window beginSheet:self.myMS_ActionNew.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                //NSLog(@"New Name: %@", [[self.myMS_ActionNew ActionName] stringValue]);
                NSLog(@"Save button tapped ");
                NSString *str=@"http://192.168.7.2:4000/api/action?client_type=OSX%20Cient%200.23&";
                NSString *action=@"action=new&id=0&name=";
                NSString *name= [[self.myMS_ActionNew ActionName] stringValue];
                NSString* strRR = [[NSString stringWithFormat:@"%@%@%@", str, action, name]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];;
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_ActionNew = nil;
    }];
}

- (IBAction)action_edit:(id)sender{
    NSLog(@"action_edit");
    self.selectedActionId = [[self.actionArray objectAtIndex:[self.actionTableView selectedRow]]objectForKey:@"id"];
    self.myMS_ActionEdit = [[MS_ActionEdit alloc] initWithWindowNibName:@"MS_ActionEdit"];
    NSNumber *recid= self.selectedActionId;
    for(int i=0;i<[self.actionArray count];i++){
        if (recid == [[self.actionArray objectAtIndex:i]objectForKey:@"id"]){
            NSString *name= [[self.actionArray objectAtIndex:i]objectForKey:@"name"];
            self.selectedActionName = name;
            self.myMS_ActionEdit.VarActionName = name;
            //NSLog(@"name: %@", name);
        }
    }
    [self.window beginSheet:self.myMS_ActionEdit.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                NSLog(@"curr id: %@", self.selectedActionId);
                NSLog(@"Save button tapped ");
                NSString *str=@"http://192.168.7.2:4000/api/action?client_type=OSX%20Cient%200.23&";
                NSString *action=@"action=edit&name=";
                NSString *name= [[self.myMS_ActionEdit ActionName] stringValue];
                NSString *act2=@"&id=";
                NSNumber *recid= self.selectedActionId ;
                NSString* strRR = [[NSString stringWithFormat:@"%@%@%@%@%@", str, action, name, act2, recid]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];;
                NSLog(@"theURL %@",strRR);
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_ActionEdit = nil;
    }];
}

- (IBAction)action_delete:(id)sender{
    NSLog(@"action_delete");
    self.selectedActionId = [[self.actionArray objectAtIndex:[self.actionTableView selectedRow]]objectForKey:@"id"];
    self.myMS_ActionDelete = [[MS_ActionDelete alloc] initWithWindowNibName:@"MS_ActionDelete"];
    NSNumber *recid= self.selectedActionId;
    for(int i=0;i<[self.actionArray count];i++){
        if (recid == [[self.actionArray objectAtIndex:i]objectForKey:@"id"]){
            NSString *name= [[self.actionArray objectAtIndex:i]objectForKey:@"name"];
            self.myMS_ActionDelete.VarActionName = name;
        }
    }
    [self.window beginSheet:self.myMS_ActionDelete.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                NSLog(@"curr id: %@", self.selectedActionId);
                NSLog(@"Save button tapped ");
                NSString *str=@"http://192.168.7.2:4000/api/action?client_type=OSX%20Cient%200.23&";
                NSString *action=@"action=delete&name=";
                NSString *name= self.myMS_ActionDelete.VarActionName;
                NSString *idtext=@"&id=";
                NSNumber *recid= self.selectedActionId ;
                NSString* strRR = [[NSString stringWithFormat:@"%@%@%@%@%@", str, action, name, idtext, recid]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_ActionDelete = nil;
    }];
}

//   --------------  Event --------------

- (void) loadEventsFromJS
{
    NSString *str=@"http://192.168.7.2:4000/eventJSON";
    NSURL *url=[NSURL URLWithString:str];
    NSData *data=[NSData dataWithContentsOfURL:url];
    NSError *jsonError = nil;
    NSMutableArray *JSONarray = [NSJSONSerialization JSONObjectWithData: data options: NSJSONReadingMutableContainers error: &jsonError];
    self.eventAllArray = JSONarray;
    NSMutableArray *_eventArray = [[NSMutableArray alloc] init];
    for(int i=0;i<[self.eventAllArray count];i++)
    {
        NSNumber *temp = (NSNumber *)[[self.eventAllArray objectAtIndex:i]objectForKey:@"action_id"];
        //NSLog(@"temp %@",temp );
        //NSLog(@"selectedActionId %@",self.selectedActionId );
        if (temp == self.selectedActionId)
        {
            [_eventArray addObject:[self.eventAllArray objectAtIndex:i]];
        }
    }
    //self.selectedActionId = [[self.actionArray objectAtIndex:0]objectForKey:@"id"];
    self.eventArray = _eventArray;
    [eventTableView reloadData];
    NSLog(@"count %lu",(unsigned long)[self.eventAllArray count] );
}

- (IBAction)event_new:(id)sender {
    //NSLog(@"event_new");
    self.myMS_EventNew = [[MS_EventNew alloc] initWithWindowNibName:@"MS_EventNew"];
    self.myMS_EventNew.deviceArray = self.deviceArray ;
    [self.window beginSheet:self.myMS_EventNew.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                NSLog(@"Save button tapped ");
                NSString *str1=@"http://192.168.7.2:4000/api/event?client_type=OSX%20Cient%200.23&";
                NSString *str2=@"action=new&id=0&action_id=";
                NSString *actionid= [self.selectedActionId stringValue];
                NSString *str3=@"&device_id=";
                NSString *deviceid= [self.myMS_EventNew.deviceID stringValue];
                NSString *str4=@"&event=";
                NSString *action= [self.myMS_EventNew.Action stringValue];
                NSString *str5=@"&val=";
                NSString *val= [self.myMS_EventNew.Value stringValue];
                NSString* strRR = [[NSString stringWithFormat:@"%@%@%@%@%@%@%@%@%@",str1,str2,actionid,str3,deviceid,str4,action,str5,val]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];;
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_EventNew = nil;
    }];
}
- (IBAction)event_edit:(id)sender{
    NSLog(@"event_edit");
    self.selectedEventId = [[self.eventArray objectAtIndex:[self.eventTableView selectedRow]]objectForKey:@"id"];
    self.myMS_EventEdit = [[MS_EventEdit alloc] initWithWindowNibName:@"MS_EventEdit"];
    for(int i=0;i<[self.eventArray count];i++){
        if (self.selectedEventId == [[self.eventArray objectAtIndex:i]objectForKey:@"id"]){
            for(int j=0;j<[self.deviceArray count];j++)
            {
                if ([[self.eventArray objectAtIndex:i]objectForKey:@"device_id"] == [[self.deviceArray objectAtIndex:j]objectForKey:@"id"]){
                    self.myMS_EventEdit.VarDevice = [[self.deviceArray objectAtIndex:j]objectForKey:@"name"];
                }
            }
            self.myMS_EventEdit.deviceID = [[self.eventArray objectAtIndex:i]objectForKey:@"device_id"];
            self.myMS_EventEdit.VarAction = [[self.eventArray objectAtIndex:i]objectForKey:@"action"];
            self.myMS_EventEdit.VarValue = [[self.eventArray objectAtIndex:i]objectForKey:@"value"];
            self.myMS_EventEdit.eventID = [[self.eventArray objectAtIndex:i]objectForKey:@"id"];
            self.myMS_EventEdit.deviceArray = self.deviceArray ;
        }
    }
    [self.window beginSheet:self.myMS_EventEdit.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                NSLog(@"curr id: %@", self.selectedEventId);
                NSLog(@"Save button tapped ");
                NSString *str1=@"http://192.168.7.2:4000/api/event?client_type=OSX%20Cient%200.23&";
                NSString *str2=@"action=edit&id=";
                NSString *eventid= [self.myMS_EventEdit.eventID stringValue];
                NSString *str2b=@"&action_id=";
                NSString *actionid= [self.selectedActionId stringValue];
                NSString *str3=@"&device_id=";
                NSString *deviceid= [self.myMS_EventEdit.deviceID stringValue];
                NSString *str4=@"&event=";
                NSString *action= [self.myMS_EventEdit.Action stringValue];
                NSString *str5=@"&val=";
                NSString *val= [self.myMS_EventEdit.Value stringValue];
                NSString* strRR = [[NSString stringWithFormat:@"%@%@%@%@%@%@%@%@%@%@%@",str1,str2,eventid,str2b,actionid,str3,deviceid,str4,action,str5,val]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];;
                NSLog(@"theURL %@",strRR);
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_EventEdit = nil;
    }];
}

- (IBAction)event_delete:(id)sender{
    NSLog(@"event_delete");
    self.selectedEventId = [[self.eventArray objectAtIndex:[self.eventTableView selectedRow]]objectForKey:@"id"];
    self.myMS_EventDelete = [[MS_EventDelete alloc] initWithWindowNibName:@"MS_EventDelete"];
    for(int i=0;i<[self.eventArray count];i++){
        if (self.selectedEventId == [[self.eventArray objectAtIndex:i]objectForKey:@"id"]){
            for(int j=0;j<[self.deviceArray count];j++)
            {
                if ([[self.eventArray objectAtIndex:i]objectForKey:@"device_id"] == [[self.deviceArray objectAtIndex:j]objectForKey:@"id"]){
                    self.myMS_EventDelete.VarName = [[self.deviceArray objectAtIndex:j]objectForKey:@"name"];
                }
            }
            
        }
    }
    [self.window beginSheet:self.myMS_EventDelete.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                NSLog(@"curr id: %@", self.selectedEventId);
                NSLog(@"Save button tapped ");
                NSString *str=@"http://192.168.7.2:4000/api/event?client_type=OSX%20Cient%200.23&";
                NSString *event=@"action=delete&name=0&id=";
                NSNumber *recid= self.selectedEventId ;
                NSString* strRR = [[NSString stringWithFormat:@"%@%@%@", str, event, recid]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];;
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_EventDelete = nil;
    }];
}


//   --------------  Timer --------------

- (void) loadTimersFromJS
{
    NSLog(@"loadTimersFromJS");
    NSString *str=@"http://192.168.7.2:4000/timerJSON";
    NSURL *url=[NSURL URLWithString:str];
    NSData *data=[NSData dataWithContentsOfURL:url];
    NSError *jsonError = nil;
    NSMutableArray *JSONarray = [NSJSONSerialization JSONObjectWithData: data options: NSJSONReadingMutableContainers error: &jsonError];
    self.timerArray = JSONarray;
}

- (IBAction)timer_new:(id)sender {
    //NSLog(@"timer_new");
    self.myMS_TimerNew = [[MS_TimerNew alloc] initWithWindowNibName:@"MS_TimerNew"];
    self.myMS_TimerNew.actionArray = self.actionArray;
    [self.window beginSheet:self.myMS_TimerNew.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                //NSLog(@"New Name: %@", [[self.myMS_TimerNew TimerName] stringValue]);
                NSLog(@"Save button tapped ");
                NSString *str=@"http://192.168.7.2:4000/api/timer?client_type=OSX%20Cient%200.23&";
                NSString *timer=@"action=new&id=0&name=";
                NSString *name= [[self.myMS_TimerNew TimerName] stringValue];
                NSString *ttext=@"&time=";
                NSNumber *time= @([[self.myMS_TimerNew TimerHour]intValue]*3600+[[self.myMS_TimerNew TimerMin]intValue]*60);
                NSString *etext=@"&enable=";
                NSString *enabletext = @"";
                if ([[self.myMS_TimerNew TimerEnable]state]){
                    enabletext=@"1";
                } else {
                    enabletext=@"0";
                }
                NSString *atext=@"&action_id=";
                NSString *actionid=[[self.myMS_TimerNew varActionId]stringValue];
                NSString* strRR = [[NSString stringWithFormat:@"%@%@%@%@%@%@%@%@%@", str, timer, name, ttext, time, etext, enabletext, atext, actionid]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_TimerNew = nil;
    }];
}
- (IBAction)timer_edit:(id)sender{
    NSLog(@"timer_edit");
    self.selectedTimerId = [[self.timerArray objectAtIndex:[self.timerTableView selectedRow]]objectForKey:@"id"];
    self.myMS_TimerEdit = [[MS_TimerEdit alloc] initWithWindowNibName:@"MS_TimerEdit"];
    self.myMS_TimerEdit.actionArray = self.actionArray;
    for(int i=0;i<[self.timerArray count];i++){
        if (self.selectedTimerId == [[self.timerArray objectAtIndex:i]objectForKey:@"id"]){
            self.myMS_TimerEdit.varTimerName = [[self.timerArray objectAtIndex:i]objectForKey:@"name"];
            int secInt = [[[self.timerArray objectAtIndex:i]objectForKey:@"time"]intValue];
            int hourInt = secInt/3600;
            int minInt = (secInt - hourInt * 3600)/60;
            self.myMS_TimerEdit.varActionId=[[self.timerArray objectAtIndex:i]objectForKey:@"action_id"];
            self.myMS_TimerEdit.varTimerHour= [NSString stringWithFormat:@"%d",hourInt];
            self.myMS_TimerEdit.varTimerMin = [NSString stringWithFormat:@"%d",minInt];
            self.myMS_TimerEdit.varTimerEnable = [[self.timerArray objectAtIndex:i]objectForKey:@"enable"];
            
        }
    }
    self.selectedTimerName = [[self.timerArray objectAtIndex:[self.timerTableView selectedRow]]objectForKey:@"name"]
    ;
    
    
    [self.window beginSheet:self.myMS_TimerEdit.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                NSLog(@"curr id: %@", self.selectedTimerId);
                NSLog(@"Save button tapped ");
                NSString *str=@"http://192.168.7.2:4000/api/timer?client_type=OSX%20Cient%200.23&";
                NSString *timer=@"action=edit&name=";
                NSString *name= [[self.myMS_TimerEdit TimerName] stringValue];
                NSString *act2=@"&id=";
                NSNumber *recid= self.selectedTimerId ;
                NSString *ttext=@"&time=";
                NSNumber *time= @([[self.myMS_TimerEdit TimerHour]intValue]*3600+[[self.myMS_TimerEdit TimerMin]intValue]*60);
                NSString *etext=@"&enable=";
                NSString *enabletext = @"";
                if ([[self.myMS_TimerEdit TimerEnable]state]){
                    enabletext=@"1";
                } else {
                    enabletext=@"0";
                }
                NSString *atext=@"&action_id=";
                NSNumber *actionid=[self.myMS_TimerEdit varActionId];

                NSString* strRR = [[NSString stringWithFormat:@"%@%@%@%@%@%@%@%@%@%@%@", str, timer, name, act2, recid,ttext, time, etext, enabletext, atext, actionid]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
                NSLog(@"theURL %@",strRR);
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_TimerEdit = nil;
    }];
}

- (IBAction)timer_delete:(id)sender{
    NSLog(@"timer_delete");
    self.selectedTimerId = [[self.timerArray objectAtIndex:[self.timerTableView selectedRow]]objectForKey:@"id"];
    self.myMS_TimerDelete = [[MS_TimerDelete alloc] initWithWindowNibName:@"MS_TimerDelete"];
    NSNumber *recid= self.selectedTimerId;
    for(int i=0;i<[self.timerArray count];i++){
        if (recid == [[self.timerArray objectAtIndex:i]objectForKey:@"id"]){
            NSString *name= [[self.timerArray objectAtIndex:i]objectForKey:@"name"];
            self.myMS_TimerDelete.VarTimerName = name;
        }
    }
    [self.window beginSheet:self.myMS_TimerDelete.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                NSLog(@"curr id: %@", self.selectedTimerId);
                NSLog(@"Save button tapped ");
                NSString *str=@"http://192.168.7.2:4000/api/timer?client_type=OSX%20Cient%200.23&";
                NSString *timer=@"action=delete&id=";
                NSNumber *recid= self.selectedTimerId ;
                NSString *ntext=@"&name=";
                NSString *name= self.myMS_TimerDelete.VarTimerName;
                NSString* strRR = [[NSString stringWithFormat:@"%@%@%@%@%@", str, timer, recid, ntext, name]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_TimerDelete = nil;
    }];
}

//   --------------  Trigger --------------

- (void) loadTriggersFromJS
{
    NSLog(@"loadTriggersFromJS");
    NSString *str=@"http://192.168.7.2:4000/triggerJSON";
    NSURL *url=[NSURL URLWithString:str];
    NSData *data=[NSData dataWithContentsOfURL:url];
    NSError *jsonError = nil;
    NSMutableArray *JSONarray = [NSJSONSerialization JSONObjectWithData: data options: NSJSONReadingMutableContainers error: &jsonError];
    self.triggerArray = JSONarray;
}

- (IBAction)trigger_new:(id)sender {
    //NSLog(@"trigger_new");
    self.myMS_TriggerNew = [[MSTriggerNew alloc] initWithWindowNibName:@"MSTriggerNew"];
    [self.window beginSheet:self.myMS_TriggerNew.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                //NSLog(@"New Name: %@", [[self.myMS_TriggerNew TriggerName] stringValue]);
                NSLog(@"Save button tapped ");
                NSString *str=@"http://192.168.7.2:4000/api/trigger?client_type=OSX%20Cient%200.23&";
                NSString *trigger=@"action=new&id=0&name=";
                NSString *name= [[self.myMS_TriggerNew TriggerName] stringValue];
                NSString* strRR = [NSString stringWithFormat:@"%@%@%@", str, trigger, name];
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_TriggerNew = nil;
    }];
}
- (IBAction)trigger_edit:(id)sender{
    NSLog(@"trigger_edit");
    self.selectedTriggerId = [[self.triggerArray objectAtIndex:[self.triggerTableView selectedRow]]objectForKey:@"id"];
    self.myMS_TriggerEdit = [[MSTriggerEdit alloc] initWithWindowNibName:@"MSTriggerEdit"];
    NSNumber *recid= self.selectedTriggerId;
    for(int i=0;i<[self.triggerArray count];i++){
        if (recid == [[self.triggerArray objectAtIndex:i]objectForKey:@"id"]){
            NSString *name= [[self.triggerArray objectAtIndex:i]objectForKey:@"name"];
            self.selectedTriggerName = name;
            self.myMS_TriggerEdit.VarTriggerName = name;
            //NSLog(@"name: %@", name);
        }
    }
    [self.window beginSheet:self.myMS_TriggerEdit.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                NSLog(@"curr id: %@", self.selectedTriggerId);
                NSLog(@"Save button tapped ");
                NSString *str=@"http://192.168.7.2:4000/api/trigger?client_type=OSX%20Cient%200.23&";
                NSString *trigger=@"action=edit&name=";
                NSString *name= [[self.myMS_TriggerEdit TriggerName] stringValue];
                NSString *act2=@"&id=";
                NSNumber *recid= self.selectedTriggerId ;
                NSString* strRR = [[NSString stringWithFormat:@"%@%@%@%@%@", str, trigger, name, act2, recid]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
                NSLog(@"theURL %@",strRR);
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_TriggerEdit = nil;
    }];
}

- (IBAction)trigger_delete:(id)sender{
    NSLog(@"trigger_delete");
    self.selectedTriggerId = [[self.triggerArray objectAtIndex:[self.triggerTableView selectedRow]]objectForKey:@"id"];
    self.myMS_TriggerDelete = [[MSTriggerDelete alloc] initWithWindowNibName:@"MSTriggerDelete"];
    NSNumber *recid= self.selectedTriggerId;
    for(int i=0;i<[self.triggerArray count];i++){
        if (recid == [[self.triggerArray objectAtIndex:i]objectForKey:@"id"]){
            NSString *name= [[self.triggerArray objectAtIndex:i]objectForKey:@"name"];
            self.myMS_TriggerDelete.VarTriggerName = name;
        }
    }
    [self.window beginSheet:self.myMS_TriggerDelete.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                NSLog(@"curr id: %@", self.selectedTriggerId);
                NSLog(@"Save button tapped ");
                NSString *str=@"http://192.168.7.2:4000/api/trigger?client_type=OSX%20Cient%200.23&";
                NSString *trigger=@"action=delete&id=";
                NSNumber *recid= self.selectedTriggerId ;
                NSString *ntext=@"&name=";
                NSString *name= self.myMS_TriggerDelete.VarTriggerName;
                NSString* strRR = [[NSString stringWithFormat:@"%@%@%@%@%@", str, trigger, recid, ntext, name]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_TriggerDelete = nil;
    }];
}

//   --------------  Lcat --------------

- (void) loadLcatsFromJS
{
    NSLog(@"loadLcatsFromJS");
    NSString *str=@"http://192.168.7.2:4000/lcatJSON";
    NSURL *url=[NSURL URLWithString:str];
    NSData *data=[NSData dataWithContentsOfURL:url];
    NSError *jsonError = nil;
    NSMutableArray *JSONarray = [NSJSONSerialization JSONObjectWithData: data options: NSJSONReadingMutableContainers error: &jsonError];
    self.lcatArray = JSONarray;
}

- (IBAction)lcat_new:(id)sender {
    //NSLog(@"lcat_new");
    self.myMS_LcatNew = [[MS_LcatNew alloc] initWithWindowNibName:@"MS_LcatNew"];
    [self.window beginSheet:self.myMS_LcatNew.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                //NSLog(@"New Name: %@", [[self.myMS_LcatNew LcatName] stringValue]);
                NSLog(@"Save button tapped ");
                NSString *str=@"http://192.168.7.2:4000/api/lcat?client_type=OSX%20Cient%200.23&";
                NSString *lcat=@"action=new&id=0&name=";
                NSString *name= [[self.myMS_LcatNew LcatName] stringValue];
                NSString* strRR = [[NSString stringWithFormat:@"%@%@%@", str, lcat, name]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_LcatNew = nil;
    }];
}
- (IBAction)lcat_edit:(id)sender{
    NSLog(@"lcat_edit");
    self.selectedLcatId = [[self.lcatArray objectAtIndex:[self.lcatTableView selectedRow]]objectForKey:@"id"];
    self.myMS_LcatEdit = [[MS_LcatEdit alloc] initWithWindowNibName:@"MS_LcatEdit"];
    NSNumber *recid= self.selectedLcatId;
    for(int i=0;i<[self.lcatArray count];i++){
        if (recid == [[self.lcatArray objectAtIndex:i]objectForKey:@"id"]){
            NSString *name= [[self.lcatArray objectAtIndex:i]objectForKey:@"name"];
            self.selectedLcatName = name;
            self.myMS_LcatEdit.VarLcatName = name;
            //NSLog(@"name: %@", name);
        }
    }
    [self.window beginSheet:self.myMS_LcatEdit.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                NSLog(@"curr id: %@", self.selectedLcatId);
                NSLog(@"Save button tapped ");
                NSString *str=@"http://192.168.7.2:4000/api/lcat?client_type=OSX%20Cient%200.23&";
                NSString *lcat=@"action=edit&name=";
                NSString *name= [[self.myMS_LcatEdit LcatName] stringValue];
                NSString *act2=@"&id=";
                NSNumber *recid= self.selectedLcatId ;
                NSString* strRR = [[NSString stringWithFormat:@"%@%@%@%@%@", str, lcat, name, act2, recid]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];;
                NSLog(@"theURL %@",strRR);
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_LcatEdit = nil;
    }];
}

- (IBAction)lcat_delete:(id)sender{
    NSLog(@"lcat_delete");
    self.selectedLcatId = [[self.lcatArray objectAtIndex:[self.lcatTableView selectedRow]]objectForKey:@"id"];
    self.myMS_LcatDelete = [[MS_LcatDelete alloc] initWithWindowNibName:@"MS_LcatDelete"];
    NSNumber *recid= self.selectedLcatId;
    for(int i=0;i<[self.lcatArray count];i++){
        if (recid == [[self.lcatArray objectAtIndex:i]objectForKey:@"id"]){
            NSString *name= [[self.lcatArray objectAtIndex:i]objectForKey:@"name"];
            self.myMS_LcatDelete.VarLcatName = name;
        }
    }
    [self.window beginSheet:self.myMS_LcatDelete.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                NSLog(@"curr id: %@", self.selectedLcatId);
                NSLog(@"Save button tapped ");
                NSString *str=@"http://192.168.7.2:4000/api/lcat?client_type=OSX%20Cient%200.23&";
                NSString *lcat=@"action=delete&id=";
                NSNumber *recid= self.selectedLcatId ;
                NSString *ntext=@"&name=";
                NSString *name= self.myMS_LcatDelete.VarLcatName;
                NSString* strRR = [[NSString stringWithFormat:@"%@%@%@%@%@", str, lcat, recid, ntext, name]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];;
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_LcatDelete = nil;
    }];
}

//   --------------  Link --------------

- (void) loadLinksFromJS
{
    NSLog(@"loadLinksFromJS");
    NSString *str=@"http://192.168.7.2:4000/linkJSON";
    NSURL *url=[NSURL URLWithString:str];
    NSData *data=[NSData dataWithContentsOfURL:url];
    NSError *jsonError = nil;
    NSMutableArray *JSONarray = [NSJSONSerialization JSONObjectWithData: data options: NSJSONReadingMutableContainers error: &jsonError];
    self.linkAllArray = JSONarray;
    NSMutableArray *_linkArray = [[NSMutableArray alloc] init];
    for(int i=0;i<[self.linkAllArray count];i++)
    {
        NSNumber *temp = (NSNumber *)[[self.linkAllArray objectAtIndex:i]objectForKey:@"cat"];
        NSLog(@"temp %@",temp );
        NSLog(@"selectedLcatId %@",self.selectedLcatId );
        if (temp == self.selectedLcatId)
        {
            [_linkArray addObject:[self.linkAllArray objectAtIndex:i]];
        }
    }
    //self.selectedLcatId = [[self.lcatArray objectAtIndex:0]objectForKey:@"id"];
    self.linkArray = _linkArray;
    [linkTableView reloadData];
    NSLog(@"count %lu",(unsigned long)[self.linkAllArray count] );
}

- (IBAction)link_new:(id)sender {
    //NSLog(@"link_new");
    self.myMS_LinkNew = [[MS_LinkNew alloc] initWithWindowNibName:@"MS_LinkNew"];
    self.myMS_LinkNew.catArray = self.lcatArray ;
    self.myMS_LinkNew.VarCat = [[self.lcatArray objectAtIndex:[self.lcatTableView selectedRow]]objectForKey:@"name"];
    self.myMS_LinkNew.catID = [[self.lcatArray objectAtIndex:[self.lcatTableView selectedRow]]objectForKey:@"id"];
    [self.window beginSheet:self.myMS_LinkNew.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                NSLog(@"Save button tapped ");
                NSString *str1=@"http://192.168.7.2:4000/api/link?client_type=OSX%20Cient%200.23&";
                NSString *str2=@"action=new&id=0&cat_id=";
                NSString *lcatid= [self.myMS_LinkNew.catID stringValue];
                NSString *str3=@"&link=";
                NSString *link= [self.myMS_LinkNew.Link stringValue];
                NSString *str5=@"&name=";
                NSString *name= [self.myMS_LinkNew.Name stringValue];
                NSString* strRR = [[NSString stringWithFormat:@"%@%@%@%@%@%@%@",str1,str2,lcatid,str3,link,str5,name]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_LinkNew = nil;
    }];
}
- (IBAction)link_edit:(id)sender{
    NSLog(@"link_edit");
    self.selectedLinkId = [[self.linkArray objectAtIndex:[self.linkTableView selectedRow]]objectForKey:@"id"];
    self.myMS_LinkEdit = [[MS_LinkEdit alloc] initWithWindowNibName:@"MS_LinkEdit"];
    self.myMS_LinkEdit.catArray = self.lcatArray ;
    self.myMS_LinkEdit.VarCat = [[self.lcatArray objectAtIndex:[self.lcatTableView selectedRow]]objectForKey:@"name"];
    self.myMS_LinkEdit.catID = [[self.lcatArray objectAtIndex:[self.lcatTableView selectedRow]]objectForKey:@"id"];
    self.myMS_LinkEdit.VarName = [[self.linkArray objectAtIndex:[self.linkTableView selectedRow]]objectForKey:@"name"];
    self.myMS_LinkEdit.linkID = [[self.linkArray objectAtIndex:[self.linkTableView selectedRow]]objectForKey:@"id"];
    self.myMS_LinkEdit.VarLink = [[self.linkArray objectAtIndex:[self.linkTableView selectedRow]]objectForKey:@"url"];
    [self.window beginSheet:self.myMS_LinkEdit.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                NSLog(@"curr id: %@", self.selectedLinkId);
                NSLog(@"Save button tapped ");
                NSString *str1=@"http://192.168.7.2:4000/api/link?client_type=OSX%20Cient%200.23&";
                NSString *str2=@"action=edit&id=";
                NSString *linkid= [self.myMS_LinkEdit.linkID stringValue];
                NSString *str2b=@"&cat_id=";
                NSString *lcatid= [self.myMS_LinkEdit.catID stringValue];
                NSString *str3=@"&link=";
                NSString *link= [self.myMS_LinkEdit.Link stringValue];
                NSString *str5=@"&name=";
                NSString *name= [self.myMS_LinkEdit.Name stringValue];
                NSString* strRR = [[NSString stringWithFormat:@"%@%@%@%@%@%@%@%@%@",str1,str2,linkid,str2b,lcatid,str3,link,str5,name]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
                NSLog(@"theURL %@",strRR);
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_LinkEdit = nil;
    }];
}

- (IBAction)link_delete:(id)sender{
    NSLog(@"link_delete");
    self.selectedLinkId = [[self.linkArray objectAtIndex:[self.linkTableView selectedRow]]objectForKey:@"id"];
    self.myMS_LinkDelete = [[MS_LinkDelete alloc] initWithWindowNibName:@"MS_LinkDelete"];
    self.myMS_LinkDelete.VarName = [[self.linkArray objectAtIndex:[self.linkTableView selectedRow]]objectForKey:@"name"];
    [self.window beginSheet:self.myMS_LinkDelete.window  completionHandler:^(NSModalResponse returnCode) {
        switch (returnCode) {
            case NSModalResponseOK:
                NSLog(@"curr id: %@", self.selectedLinkId);
                NSLog(@"Save button tapped ");
                NSString *str=@"http://192.168.7.2:4000/api/link?client_type=OSX%20Cient%200.23&";
                NSString *link=@"action=delete&id=";
                NSNumber *recid= self.selectedLinkId ;
                NSString *ntext=@"&name=";
                NSString *name= self.myMS_LinkDelete.VarName;
                NSString* strRR = [[NSString stringWithFormat:@"%@%@%@%@%@", str, link, recid, ntext, name]stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];;
                NSURL *url=[NSURL URLWithString:strRR];
                [NSData dataWithContentsOfURL:url];
                break;
            case NSModalResponseCancel:
                NSLog(@"Cancel button tapped in Custom Sheet");
                break;
            default:
                break;
        }
        self.myMS_LinkDelete = nil;
    }];
}

- (IBAction)link_openBrowser:(id)sender{
    NSLog(@"link_openBrowser");
    
    
    self.myMS_LinkDelete = [[MS_LinkDelete alloc] initWithWindowNibName:@"MS_LinkDelete"];
    browserWindow = [[BrowserWindow alloc] initWithWindowNibName:@"BrowserWindow"];
    browserWindow.VarWindowTitle = [[self.linkArray objectAtIndex:[self.linkTableView selectedRow]]objectForKey:@"name"];
    
    browserWindow.linkArray = self.linkArray;
    browserWindow.catArray = self.lcatArray;
    browserWindow.VarCat = [[self.lcatArray objectAtIndex:[self.lcatTableView selectedRow]]objectForKey:@"name"];
    browserWindow.catID = [[self.lcatArray objectAtIndex:[self.lcatTableView selectedRow]]objectForKey:@"id"];
    browserWindow.VarName = [[self.linkArray objectAtIndex:[self.linkTableView selectedRow]]objectForKey:@"name"];
    browserWindow.VarLink = [[self.linkArray objectAtIndex:[self.linkTableView selectedRow]]objectForKey:@"url"];
 
    [browserWindow showWindow:self];
}


//   -------------- Device --------------

- (void) loadDevicesFromJS
{
    NSString *str=@"http://192.168.7.2:4000/deviceJSON";
    NSURL *url=[NSURL URLWithString:str];
    NSData *data=[NSData dataWithContentsOfURL:url];
    NSError *jsonError = nil;
    NSMutableArray *devArray = [[NSMutableArray alloc] init];
    NSMutableArray *JSONarray = [NSJSONSerialization JSONObjectWithData: data options: NSJSONReadingMutableContainers error: &jsonError];
    
    for(int i=0;i<[JSONarray count];i++)
    {
        NSString *temp = (NSString *)[[JSONarray objectAtIndex:i]objectForKey:@"mobi"];
        if ([temp isEqualToString:@"1"])
        {
            [devArray addObject:[JSONarray objectAtIndex:i]];
        }
    }
    self.deviceArray = devArray;
}

- (IBAction)d_on:(id)sender {
    
    NSString* device_id = [d_id stringValue];
    NSString* midStr = @"-on-100";
    NSString* strRR = [NSString stringWithFormat:@"%@%@", device_id, midStr];
    [[NSNotificationCenter defaultCenter]postNotificationName:@"sendserialNotification" object:strRR];
}

- (IBAction)d_off:(id)sender {
    NSString* device_id = [d_id stringValue];
    NSString* midStr = @"-off-0";
    NSString* strRR = [NSString stringWithFormat:@"%@%@", device_id, midStr];
    [[NSNotificationCenter defaultCenter]postNotificationName:@"sendserialNotification" object:strRR];
}

- (IBAction)d_toggle:(id)sender {
    NSString* device_id = [d_id stringValue];
    NSString* midStr = @"-toggle-0";
    NSString* strRR = [NSString stringWithFormat:@"%@%@", device_id, midStr];
    [[NSNotificationCenter defaultCenter]postNotificationName:@"sendserialNotification" object:strRR];
}


- (void) dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    [super dealloc];
}



@end
