<table>
    <tr><th><%= this.l10n("from") %></th><td><strong><%= _airportFrom.get('name') %></strong><span><%= _countryFrom.get('name') %></span></td><th><%= this.l10n("to") %></th><td><strong><%= _airportTo.get('name') %></strong><span><%= _countryTo.get('name') %></span></td></tr>
    <tr><th><%= this.l10n("date of departure") %></th><td><%= $.datepicker.formatDate('dd.mm.yy', $.datepicker.parseDate('yy-mm-ddT00:00:00', depdate)) %></td><% if(type == 'RT') { %><th><%= this.l10n("date of arrival") %></th><td><%= $.datepicker.formatDate('dd.mm.yy', $.datepicker.parseDate('yy-mm-ddT00:00:00', arrdate)) %></td><% } else { %><td></td><th></th><% } %></tr>
    <tr><td colspan="4">
        <span><span><%= this.l10n('adults') %></span><strong><%= passadt %></strong></span><span><span><%= this.l10n('children') %></span><strong><%= passcnn %></strong></span><span><span><%= this.l10n('babies') %></span><strong><%= passinf %></strong></span><span><span><%= this.l10n('Infants with a place') %></span><strong><%= passins %></strong></span><span><span><%= this.l10n('Class') %></span><strong><%= classflight %></strong></span>
    </td></tr>
</table>
<table>
    <tbody>
        <tr><td>
            <!-- settings -->
        </td><td>
            <table>
                <thead>
                    <tr><th><a></a></th><th></th><th></th></tr>
                </thead>
                <tbody data-id="content">
                    
                </tbody>
            </table>
        </td><tr>
    </tbody>
</table>
