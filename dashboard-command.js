const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    PermissionFlagsBits
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dashboard')
        .setDescription('Open the bot dashboard for this server'),

    async execute(interaction) {
        // Must be used in a server
        if (!interaction.guild) {
            return interaction.reply({
                content: '❌ This command can only be used inside a server.',
                ephemeral: true
            });
        }

        // Permission check (Manage Server)
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
            return interaction.reply({
                content: '❌ You need **Manage Server** permission to access the dashboard.',
                ephemeral: true
            });
        }

        const guildId = interaction.guild.id;
        const guildName = interaction.guild.name;

        const dashboardURL = `https://www.erlcaidbot.xyz/dashboard/${guildId}`;

        // Button
        const button = new ButtonBuilder()
            .setLabel('Open Dashboard')
            .setStyle(ButtonStyle.Link)
            .setURL(dashboardURL)
            .setEmoji('🔗');

        const row = new ActionRowBuilder().addComponents(button);

        // Embed
        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('🛠️ Server Dashboard')
            .setDescription(
                `Access the control panel for **${guildName}**.\n\n` +
                `Use the button below to manage your server settings, logs, and features.`
            )
            .addFields(
                { name: 'Server ID', value: `\`${guildId}\``, inline: true },
                { name: 'Dashboard URL', value: `[Click Here](${dashboardURL})`, inline: true }
            )
            .setFooter({ text: 'ERLC Aid Bot • Dashboard System' })
            .setTimestamp();

        // Reply
        await interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true
        });
    }
};
