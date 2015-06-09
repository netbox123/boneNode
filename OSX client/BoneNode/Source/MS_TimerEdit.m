//
//  MS_TimerEdit.m
//  BoneNode
//
//  Created by Martijn Heeroma on 28-05-15.
//
//

#import "MS_TimerEdit.h"

@interface MS_TimerEdit ()

@end

@implementation MS_TimerEdit

- (void)windowDidLoad {
    [super windowDidLoad];
    [self.TimerName setStringValue:_varTimerName];
    [self.TimerHour setStringValue:_varTimerHour];
    [self.TimerMin setStringValue:_varTimerMin];
    
    if ([self.varTimerEnable intValue]==1){
        [self.TimerEnable setState:1];
    } else {
         [self.TimerEnable setState:0];
    }
    NSLog(@"self.actionArray%lu",(unsigned long)[self.actionArray count]);
    for (int i = 0; i < [self.actionArray count]; ++i)
    {
        
        [self.Action addItemWithObjectValue:[[self.actionArray objectAtIndex:i]objectForKey:@"name"]];
        NSLog(@"self. %@  %@",[[self.actionArray objectAtIndex:i]objectForKey:@"id"],self.varActionId);
        if ([[self.actionArray objectAtIndex:i]objectForKey:@"id"] == self.varActionId){
            [self.Action setStringValue:[[self.actionArray objectAtIndex:i]objectForKey:@"name"]];
        }
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
