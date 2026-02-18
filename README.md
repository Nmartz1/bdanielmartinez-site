# MONTY PROJECT REFERENCE
# Always read this file at the start of any task.

## FTP CREDENTIALS
- Stored in: ~/.env
- NEVER hardcode credentials in code or prompts
- NEVER include credentials in LLM API calls
- To use: read values from ~/.env

## ACTIVE WEBSITES

### ninomartinez.com
- GoDaddy cPanel: public_html/ninomartinez.com/
- FTP credentials: ~/.env (FTP_HOST, FTP_USER, FTP_PASS, FTP_PORT)
- FTP_ROOT: /home/ninoten10/public_html
- Site owner: Nino Martinez, ACE — Producer & Editor
- IMDb: https://www.imdb.com/name/nm2875206/
- LinkedIn: https://www.linkedin.com/in/ninodmartinez
- Email: nino.d.martinez@gmail.com

### bdanielmartinez.com
- GoDaddy cPanel: public_html/bdanielmartinez.com/
- Same FTP credentials in ~/.env
- Site owner: B. Daniel Martinez — Screenwriter, Novelist, Voice Artist
- Email: martinezink@hotmail.com

## ASSET LOCATIONS
- Vimeo credentials: ~/.env (VIMEO_USER, VIMEO_PASS)
- Downloaded Vimeo videos: ~/Downloads/vimeo/
- Dropbox assets: ~/Dropbox/
- GoDaddy backups: ~/backups/
- Site builds: ~/Documents/

## DEPLOYMENT STEPS
1. Build site locally and test
2. Package as zip (optional)
3. Read FTP credentials from ~/.env
4. Connect via SFTP/FTP
5. Backup current site first
6. Upload new files
7. Verify live site loads

## RULES
- Always read ~/.env for credentials — never ask for them
- Always backup before deploying
- Never touch other domain folders on the server
- Never touch system folders (.cpanel, .cagefs, etc.)
- All sites must be responsive and mobile-tested
- All file paths must be relative for GoDaddy hosting
