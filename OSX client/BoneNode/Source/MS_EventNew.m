//
//  MS_EventNew.m
//  BoneNode
//
//  Created by Martijn Heeroma on 26-05-15.
//
//

#import "MS_EventNew.h"

@interface MS_EventNew ()

@end

@implementation MS_EventNew

- (void)windowDidLoad {
    [super windowDidLoad];
    
    

    for (int i = 0; i < [self.deviceArray count]; ++i)
    {
        [self.Device addItemWithObjectValue:[[self.deviceArray objectAtIndex:i]objectForKey:@"name"]];
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
