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

- (void)windowWillLoad {
    NSString *str=@"http://192.168.7.2:4000/deviceJSON";
    NSURL *url=[NSURL URLWithString:str];
    NSData *data=[NSData dataWithContentsOfURL:url];
    NSError *jsonError = nil;
    NSMutableArray *devArray = [[NSMutableArray alloc] init];
    NSArray *JSONarray = [NSJSONSerialization JSONObjectWithData: data options: NSJSONReadingMutableContainers error: &jsonError];
    
    for(int i=0;i<[JSONarray count];i++)
    {
        NSString *temp = (NSString *)[[JSONarray objectAtIndex:i]objectForKey:@"mobi"];
        if ([temp isEqualToString:@"1"])
        {
            [devArray addObject:[JSONarray objectAtIndex:i]];
        }
    }
    
    self.deviceArray = devArray;
    
    str=@"http://192.168.7.2:4000/actionJSON";
    url=[NSURL URLWithString:str];
    data=[NSData dataWithContentsOfURL:url];
    jsonError = nil;
    JSONarray = [NSJSONSerialization JSONObjectWithData: data options: NSJSONReadingMutableContainers error: &jsonError];
    self.actionArray = JSONarray;
}

- (void)windowDidLoad {
    [super windowDidLoad];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(receiveMainNotification:)
                                                 name:@"MainNotification"
                                               object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(receivedeviceChangeNotification:)
                                                 name:@"deviceChangeNotification"
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

- (void) receivedeviceChangeNotification:(NSNotification *) notification
{
    
    NSString *varid = [[[notification object] componentsSeparatedByString:@"-"] objectAtIndex:0];
    NSString *varaction = [[[notification object] componentsSeparatedByString:@"-"] objectAtIndex:1];
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
        if ([varid  isEqual: @"3001"]){[bmv_v setStringValue:varvalue];}
        if ([varid  isEqual: @"3002"]){[bmv_i setStringValue:varvalue];[bmv_display setStringValue:varvalue];}
        if ([varid  isEqual: @"3003"]){[bmv_ce setStringValue:varvalue];}
        if ([varid  isEqual: @"3004"]){[bmv_soc setStringValue:varvalue];}
        if ([varid  isEqual: @"3005"]){[bmv_ttg setStringValue:varvalue];}
        if ([varid  isEqual: @"3006"]){[bmv_alarm setStringValue:varvalue];}
        if ([varid  isEqual: @"3007"]){[bmv_relay setStringValue:varvalue];}
        if ([varid  isEqual: @"3008"]){[bmv_p setStringValue:varvalue];}
        
        if ([varid  isEqual: @"4020"]){[t_KEL setStringValue:varvalue];}
        if ([varid  isEqual: @"4021"]){[h_KEL setStringValue:varvalue];}
        if ([varid  isEqual: @"4002"]){[t_K1 setStringValue:varvalue];}
        if ([varid  isEqual: @"4003"]){[t_K2 setStringValue:varvalue];}
        if ([varid  isEqual: @"4004"]){[t_B1 setStringValue:varvalue];}
        if ([varid  isEqual: @"4005"]){[t_B2 setStringValue:varvalue];}
        if ([varid  isEqual: @"4006"]){[t_B3 setStringValue:varvalue];}
        if ([varid  isEqual: @"4009"]){[t_G2 setStringValue:varvalue];}
        if ([varid  isEqual: @"4008"]){[t_BU setStringValue:varvalue];}
        if ([varid  isEqual: @"4007"]){[t_G1 setStringValue:varvalue];}
        if ([varid  isEqual: @"4001"]){[t_WK setStringValue:varvalue];}
    }
    //NSLog(@"%@", [notification object]);
}



//   -------------- TableViews --------------

- (NSInteger)numberOfRowsInTableView:aTableView {
    if (aTableView == deviceTableView) return [deviceArray count];
    else if (aTableView == actionTableView) return [actionArray count];
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
