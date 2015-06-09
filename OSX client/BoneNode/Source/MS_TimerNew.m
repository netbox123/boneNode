//
//  MS_TimerNew.m
//  BoneNode
//
//  Created by Martijn Heeroma on 28-05-15.
//
//

#import "MS_TimerNew.h"

@interface MS_TimerNew ()

@end

@implementation MS_TimerNew

- (void)windowDidLoad {
    [super windowDidLoad];
    
    
    
    for (int i = 0; i < [self.actionArray count]; ++i)
    {
        [self.Action addItemWithObjectValue:[[self.actionArray objectAtIndex:i]objectForKey:@"name"]];
    }
}

- (IBAction)didTapCancelButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseCancel];
}

- (IBAction)didTapDoneButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseOK];
}

- (IBAction)actionMenu:(id)sender{
    NSUInteger currentRow = [self.Action indexOfSelectedItem];
    self.varActionId = [[self.actionArray objectAtIndex:currentRow]objectForKey:@"id"];
    NSLog(@"varActionId%@",self.varActionId);
}

@end
