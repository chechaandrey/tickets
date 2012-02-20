<table>
    <tr><th><%= this.l10n("from") %></th><td><strong><%= _airportFrom.get('name') %></strong><span><%= _countryFrom.get('name') %></span></td><th><%= this.l10n("to") %></th><td><strong><%= _airportTo.get('name') %></strong><span><%= _countryTo.get('name') %></span></td></tr>
    <tr><th><%= this.l10n("date of departure") %></th><td><%= $.datepicker.formatDate('dd.mm.yy', $.datepicker.parseDate('yy-mm-ddT00:00:00', depdate)) %></td><% if(type == 'RT') { %><th><%= this.l10n("date of arrival") %></th><td><%= $.datepicker.formatDate('dd.mm.yy', $.datepicker.parseDate('yy-mm-ddT00:00:00', arrdate)) %></td><% } else { %><td></td><th></th><% } %></tr>
    <tr><td colspan="4">
        <span><span><%= this.l10n('adults') %></span><strong><%= passadt %></strong></span><span><span><%= this.l10n('children') %></span><strong><%= passcnn %></strong></span><span><span><%= this.l10n('babies') %></span><strong><%= passinf %></strong></span><span><span><%= this.l10n('Infants with a place') %></span><strong><%= passins %></strong></span>
    </td></tr>
</table>
<table>
    <tbody>
        <tr><td>
            <table>
                <tbody>
                    <tr><td>price</td></tr>
                    <tr><td>time to</td></tr>
                    <tr><td>time from</td></tr>
                    <tr><td>Only with changes</td></tr>
                    <tr><td>Class</td></tr>
                </tbody>
            </table>
        </td><td>
            <table>
                <thead>
                    <tr><th><a href="javascript:void(0)" data-id="airline"><%= this.l10n("Airline") %></a></th><th><a href="javascript:void(0)" data-id="duration"><%= this.l10n("Flight duration") %></a></th><th><a href="javascript:void(0)" data-id="price"><%= this.l10n("Price") %></a></th></tr>
                </thead>
                <tbody data-id="content">
                </tbody>
            </table>
        </td><tr>
    </tbody>
</table>
