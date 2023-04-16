use anchor_lang::prelude::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("pAFUgqJKgi8zNLynFzLCj35moLh6tmemMnh9HQ7Jcyy");

// Part1
#[program]
mod hello_world {
    use super::*;
    // Part 1
    // pub fn say_hello(_ctx: Context<SayHello>) -> Result<()> { 
    //     msg!("Hello World!"); // Message will show up in the tx logs
    //     Ok(())
    // }
    
    // Part 2-2
    pub fn say_hello(ctx: Context<SayHello>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count += 1;
        msg!("Hello World! - Greeting # {}", counter.count);
        Ok(())
    }
    // Part 2
    // pub fn initialize_counter(ctx: Context<Initialize>) -> Result<()> { 
    //     let counter = &mut ctx.accounts.counter;
    //     counter.count = 0;
    //     msg!("Initialized new count. Current value: {}!", counter.count);
    //     Ok(())
    // }
}

// Part1
// #[derive(Accounts)]
// pub struct SayHello {}

// Part 2-2
#[derive(Accounts)]
pub struct SayHello<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>,
}

// Part 2
#[account]
pub struct Counter {
    count: u64
}

// Part 2
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = 8 + 8)]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
