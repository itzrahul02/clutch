
const generateMail = (to, token = "",teamName = "", contact = 0, teamPlayers = []) => {
    
    const playerDetails = teamPlayers.map(team=>
        `
        <div>
          <div>${team.name}</div>
          <div>${team.email}</div>
        </div>
        `
    ).join("")

    return {
        from: `"Clutch IIIT Kota" <${process.env.EMAIL}>`,
        to,
        subject: "Clutch event registration confirmation",
        text: token,

        html: 
        
        `
        <div>Thank you for registering for the event hosted by Clutch! We're thrilled to have you join us for an epic gaming experience.</div>
        <div>To complete your registration, please verify your email by clicking the link below:</div>
         <p> <a href="https://clutchiiitk.vercel.app/api/player/${token}">Verification Link</a></p>
         <p>${teamName}</p>
         <p>${contact}</p>
         <p>${playerDetails}</p>
        <div>This step is necessary to confirm your participation and receive event updates.
If you did not register for this event, please ignore this email. For any queries, feel free to reach out to us. </div>
        <div>Get ready for the competition—see you soon!</div>
        <div>Best regards,</div>
        <div>Team Clutch</div>        
        `

    };
};

module.exports = generateMail;