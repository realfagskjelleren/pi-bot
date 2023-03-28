# Pibot

## Description

Discord bot for RFKs discordserver.

Written in [discordjs]() / [discordx]()

## Project Folder Structure

```
pi-bot
├── LICENSE
├── node_modules
├── package.json
├── pnpm-lock.yaml
├── README.md
├── src
│   ├── commands
│   │   ├── community
│   │   ├── moderate
│   │   ├── member
│   │   └── employee
│   ├── events
│   │   └── common.ts
│   └── main.ts
└── tsconfig.json
```

## Command Folders

### Community

This folder is intended for fun / commands that concern the community

#### Example Ideas:

- Sending cheers / cudos
- Getting memes
- Games (although that could probably go in a subfolder)

### Moderate

This folder is intended for commands that are needed / useful for moderating the server.

#### Examples:

- CRUD
  - Scheduled events
  - Commands
  - Roles
  - Permissions
- User moderation
  - Ban (time limited or lifetime)
  - Kick
  - Mute
  - Warn
  - CRUD
    - Roles
    - Permissions
    - Part of events

### Member

This folder is intended for commands that are for members of the discord server in general.

## Example Ideas

- CRUDS
  - Reminder
  - Personal note
- See upcoming events member is taking part in

### Employee

This folder is intended for commands that are useful for an 'employee' of RFK.

## Example Ideas:

- See
  - Upcoming internal events (galla, jub, etc)
  - Upcoming shifts
  - Skigard
- Sign up to / request access / queue
  - Upcoming internal events

## Planned features

- [ ] CRUD
  - [ ] Events
    - [ ] Privacy Level
      - [ ] SS
      - [ ] S
    - [ ] Internal
      - [ ] Meeting
      - [ ] Event / Happening
    - [ ] Public -[ ] Baråpning - [ ] Fredagsåpent - [ ] Tema - [ ] Generell Baråpning [customizeable]
      - [ ] General event [customizable]
  - [ ] Roles
  - [ ] Reaction Roles
  - [ ] Custom Auto-Replies
    - [ ] Member
    - [ ] Role
    - [ ] Channel
    - [ ] Server
  - [ ] Reminders
    - [ ] Personal (Member)
    - [ ] Role
    - [ ] Channel
    - [ ] Server
  - [ ] Notes
    - [ ] Personal (Member)
    - [ ] Role
    - [ ] Channel
    - [ ] Server
- [ ] Moderation
  - [ ] Commands
    - [ ] Availability by role
  - [ ] Member
    - [ ] Roles
      - [ ] Add
      - [ ] Remove
    - [ ] Kick
    - [ ] Ban
      - [ ] Time limited
      - [ ] Lifetime
- [ ] Member
  - [ ] Note
  - [ ] Reminder
  - [ ] See upcoming events theyre signed up for
- [ ] 'Employee'
  - [ ] See upcoming
    - [ ] Meeting
    - [ ] Shift
    - [ ] Internal Events
  - [ ] Take part in
    - [ ] Meeting
  - [ ] Apply to / sign up
    - [ ] Internal Events
  - [ ] Absence
    - [ ] Inform of
    - [ ] See own
    - [ ] See others
  - [ ] See skigards awarded to them
  - [ ] Shift
    - [ ] See
      - [ ] Shift manager
      - [ ] Shit coworker
      - [ ] own Upcoming
      - [ ] Others Upcoming
    - [ ] Swap
      - [ ] Suggest
      - [ ] Approve / deny
- [ ] Community
  - [ ] Cheers
    - [ ] Send ( to user )
    - [ ] Reply
