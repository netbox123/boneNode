//
//  LogWindow.m
//  BoneNode
//
//  Created by Martijn Heeroma on 13-06-15.
//
//

#import "LogWindow.h"

@interface LogWindow ()

@end

@implementation LogWindow

- (void)windowWillLoad {
    NSString *str=@"http://192.168.7.2:4000/logJSON";
    NSURL *url=[NSURL URLWithString:str];
    NSData *data=[NSData dataWithContentsOfURL:url];
    NSError *jsonError = nil;
    NSMutableArray *JSONarray = [NSJSONSerialization JSONObjectWithData: data options: NSJSONReadingMutableContainers error: &jsonError];
    self.logArray = JSONarray;
}

- (void)windowDidLoad {
    [super windowDidLoad];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(receiveLogNotification:)
                                                 name:@"LogNotification"
                                               object:nil];
    
    //[self.TextView setString:@"testString"];
    for (int i = 0; i < [self.logArray count]; ++i)
    {
        NSString* strMSG = [[self.logArray objectAtIndex:i]objectForKey:@"msg"];
        NSString* strRR = [NSString stringWithFormat:@"%@%@", strMSG, @"\n"];
        [self.TextView insertText:strRR];
    }
}

- (void) receiveLogNotification:(NSNotification *) notification
{
    NSLog(@"LogNotification");
    NSArray * words = [[notification object] componentsSeparatedByString:@";"];
    NSString *msgTitle = [words objectAtIndex:0];
    NSString *msgInfo = [words objectAtIndex:1];
    NSString* strRR = [NSString stringWithFormat:@"%@ %@", msgTitle, msgInfo];
    [self.TextView setFont:[NSFont fontWithName:@"Menlo" size:18]];
    [self.TextView insertText:strRR];
    
}

@end
