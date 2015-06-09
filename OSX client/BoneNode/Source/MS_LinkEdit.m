//
//  MS_LinkEdit.m
//  BoneNode
//
//  Created by Martijn Heeroma on 29-05-15.
//
//

#import "MS_LinkEdit.h"

@interface MS_LinkEdit ()

@end

@implementation MS_LinkEdit

- (void)windowDidLoad {
    [super windowDidLoad];
    
    
    [self.Cat setStringValue:_VarCat];
    [self.Link setStringValue:_VarLink];
    [self.Name setStringValue:_VarName];
    
    
    for (int i = 0; i < [self.catArray count]; ++i)
    {
        [self.Cat addItemWithObjectValue:[[self.catArray objectAtIndex:i]objectForKey:@"name"]];
    }
}

- (IBAction)catMenu:(id)sender{
    NSUInteger currentRow = [self.Cat indexOfSelectedItem];
    self.catID = [[self.catArray objectAtIndex:currentRow]objectForKey:@"id"];
    NSLog(@"self.catID%@",self.catID);
}

- (IBAction)didTapCancelButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseCancel];
}

- (IBAction)didTapDoneButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseOK];
}

@end
