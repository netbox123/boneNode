//
//  MS_EventEdit.m
//  BoneNode
//
//  Created by Martijn Heeroma on 26-05-15.
//
//

#import "MS_EventEdit.h"

@interface MS_EventEdit ()

@end

@implementation MS_EventEdit

- (void)windowDidLoad {
    [super windowDidLoad];
    
    
    [self.Device setStringValue:_VarDevice];
    [self.Action setStringValue:_VarAction];
    [self.Value setStringValue:_VarValue];
 
    
    for (int i = 0; i < [self.deviceArray count]; ++i)
    {
        [self.Device addItemWithObjectValue:[[self.deviceArray objectAtIndex:i]objectForKey:@"name"]];
    }
}

- (IBAction)didTapAction:(id)sender {
    NSLog(@"didTapAction ");
    if([[self.Action stringValue]  isEqual: @"on"]){
        [self.Value setStringValue:@"100"];
    } else if([[self.Action stringValue]  isEqual: @"off"]){
        [self.Value setStringValue:@"0"];
    }
}

- (IBAction)deviceMenu:(id)sender{
    NSUInteger currentRow = [self.Device indexOfSelectedItem];
    self.deviceID = [[self.deviceArray objectAtIndex:currentRow]objectForKey:@"id"];
    NSLog(@"self.deviceID%@",self.deviceID);
}

- (IBAction)didTapCancelButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseCancel];
}

- (IBAction)didTapDoneButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseOK];
}

@end
