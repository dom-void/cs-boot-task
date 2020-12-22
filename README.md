# cs-boot-task

# Requirements

## Form page

- [ ] Entry at form.html
- [ ] accept request ID via url parameter,
- [ ] id provided should load existing request but disable the form unless the current user (fake ask api query) has role Owner
- [ ] no id should mean new item

### Fields

- [x] Request name: required short text
    - [x] no more than 255 characters
- [ ] Requestor: required
    - [ ] person picker (search on each keystroke within people.json, match any field, include partials, show first 5 results unsorted)
- [x] Good ending: required radio Yes/Depends/No
- [x] Description: required long text, no limit, minimum 250 characters; description under the field: “No spoilers please”
- [ ] Need storyteller: checkbox, required
- [ ] Storyteller: required & visible when Need storyteller equals true
- [x] Wanted characters: multiple choice, optional, use 100 random short strings as options
- [ ] Deadline: optional datepicker
    - [ ] enforce minimum a week ahead (according to utc current time), set 4 weeks ahead by default, no later than current year end,
- [x] Budget: required, number, minimum 250000 description: In Fable Dollars (FBD), no less than 250000
- [ ] Status: hidden, disabled)

### Buttons

- [ ] Cancel (returns to dashboard, discards changes)
- [ ] Save as draft (save with Status Draft, return to dashboard)
- [ ] Submit (
    - [ ] validate form, if invalid break and highlight issues on the form,
    - [ ] else fake api query save with Status New,
    - [ ] fake api email query (to: requestor, storyteller, subject: new request, body: Hi, A new request has been created by (Requestor.DisplayName). Cheers, Story Team)
    - [ ] return to dashboard