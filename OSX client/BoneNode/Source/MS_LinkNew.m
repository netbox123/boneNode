//
//  MS_LinkNew.m
//  BoneNode
//
//  Created by Martijn Heeroma on 29-05-15.
//
//

#import "MS_LinkNew.h"

@interface MS_LinkNew ()

@end

@implementation MS_LinkNew

- (void)windowDidLoad {
    [super windowDidLoad];
    
    
    for (int i = 0; i < [self.catArray count]; ++i)
    {
        [self.Cat addItemWithObjectValue:[[self.catArray objectAtIndex:i]objectForKey:@"name"]];
    }
    [self.Cat setStringValue:_VarCat];
    //NSLog(@"_VarCat%@",_VarCat);
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
