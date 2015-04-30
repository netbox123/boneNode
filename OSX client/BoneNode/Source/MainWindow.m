//
//  MainWindow.m
//  BoneNode
//
//  Created by Martijn Heeroma on 19-04-15.
//
//

#import "MainWindow.h"

@interface MainWindow ()

@end

@implementation MainWindow

@synthesize deviceArray;
@synthesize actionArray;
@synthesize deviceTableView;
@synthesize actionTableView;

- (void)windowDidLoad {
    [super windowDidLoad];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(receiveMainNotification:)
                                                 name:@"MainNotification"
                                               object:nil];
}

- (void) receiveMainNotification:(NSNotification *) notification
{

    NSArray * words = [[notification object] componentsSeparatedByString:@"*"];
    for (NSString * word in words){
        NSString *varid = [[word componentsSeparatedByString:@"#"] objectAtIndex:0];
        NSString *varvalue = [[word componentsSeparatedByString:@"#"] objectAtIndex:1];
        
        if ([varid  isEqual: @"1003"]){
            [timeString setStringValue:varvalue];
        }
        if ([varid  isEqual: @"1004"]){
            [dateString setStringValue:varvalue];
        }
        
        if ([varid  isEqual: @"3001"]){
            [bmv_v setStringValue:varvalue];
        }
        if ([varid  isEqual: @"3002"]){
            [bmv_i setStringValue:varvalue];
            [bmv_display setStringValue:varvalue];
        }
        if ([varid  isEqual: @"3003"]){
            [bmv_ce setStringValue:varvalue];
        }
        if ([varid  isEqual: @"3004"]){
            [bmv_soc setStringValue:varvalue];
        }
        if ([varid  isEqual: @"3005"]){
            [bmv_ttg setStringValue:varvalue];
        }
        if ([varid  isEqual: @"3006"]){
            [bmv_alarm setStringValue:varvalue];
        }
        if ([varid  isEqual: @"3007"]){
            [bmv_relay setStringValue:varvalue];
        }
        if ([varid  isEqual: @"3008"]){
            [bmv_p setStringValue:varvalue];
        }
    }
    //NSLog(@"%@", [notification object]);
}

- (void)windowWillLoad {
    NSString *str=@"http://192.168.7.2:4000/xcode/data/device.json";
    NSURL *url=[NSURL URLWithString:str];
    NSData *data=[NSData dataWithContentsOfURL:url];
    NSError *jsonError = nil;
    NSArray *JSONarray = [NSJSONSerialization JSONObjectWithData: data options: NSJSONReadingMutableContainers error: &jsonError];
    self.deviceArray = JSONarray;
    
    str=@"http://192.168.7.2:4000/xcode/data/action.json";
    url=[NSURL URLWithString:str];
    data=[NSData dataWithContentsOfURL:url];
    jsonError = nil;
    JSONarray = [NSJSONSerialization JSONObjectWithData: data options: NSJSONReadingMutableContainers error: &jsonError];
    self.actionArray = JSONarray;
}

//   -------------- TableViews --------------

- (NSInteger)numberOfRowsInTableView:aTableView {
    if (aTableView == deviceTableView) return [deviceArray count];
    else if (aTableView == actionTableView) return [actionArray count];
    return 0;
}

- (id)tableView:(NSTableView *)aTableView objectValueForTableColumn:(NSTableColumn *)tableColumn row:(NSInteger)row {
    if (aTableView == deviceTableView) {
        if ([tableColumn.identifier isEqualToString:@"id"]) {
            // first colum (id)
            return [[self.deviceArray objectAtIndex:row]objectForKey:@"id"];
        } else {
            // second column (name)
            return [[self.deviceArray objectAtIndex:row]objectForKey:@"name"];
        }
    } else if (aTableView == actionTableView) {
        if ([tableColumn.identifier isEqualToString:@"id"]) {
            // first colum (id)
            return [[self.actionArray objectAtIndex:row]objectForKey:@"id"];
        } else {
            // second column (name)
            return [[self.actionArray objectAtIndex:row]objectForKey:@"name"];
        }
    } else {
        return nil;
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
        
        NSLog(@"Device row %ld", (long)aTableView.selectedRow);
        
    } else if (aTableView == actionTableView) {
        NSLog(@"Action row %ld", (long)aTableView.selectedRow);
    }
}



//   --------------  --------------

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
