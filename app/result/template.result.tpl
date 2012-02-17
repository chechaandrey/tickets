<table>
    <tr><td><strong><%= airportFrom.name %></strong><span><%= countryFrom.name %></span></td><td><strong><%= airportTo.name %></strong><span><%= countryTo.name %></span></td></tr>
    <tr><td><%= $.datepicker.formatDate('dd.mm.yy', $.datepicker.parseDate('yy-mm-ddT00:00:00', depdate)) %></td><td><%= $.datepicker.formatDate('dd.mm.yy', $.datepicker.parseDate('yy-mm-ddT00:00:00', arrdate)) %></td></tr>
    <tr><td colspan="2"></td></tr>
</table>
<table>
    <tbody><tr><td></td><td></td></tr></tbody>
</table>
