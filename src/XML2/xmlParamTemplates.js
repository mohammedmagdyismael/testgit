const patientName = "<Parameter>    \n<PlaceHolder>(PatientName)</PlaceHolder>  \n<Description>Patient Full Name</Description>  \n<Source>  \n<DataModel>   \n<Path>Patient/Name</Path> \n<TName/>  \n</DataModel>  \n<Query/>  \n<Utility/>    \n<APIURL/> \n</Source> \n</Parameter>  \n\n"
const patientMobileNumber = "<Parameter>    \n<PlaceHolder>(PatientMobileNumber)</PlaceHolder>  \n<Description>Patient Mobile Number</Description>  \n<Source>  \n<DataModel>   \n<Path>Patient/MobileNumber</Path> \n<TName/>  \n</DataModel><Query/>  \n<Utility/>    \n<APIURL/> \n</Source> \n</Parameter>  \n\n"
const patientEmail = "<Parameter>   \n<PlaceHolder>(PatientEmails)</PlaceHolder>    \n<Description>Patient Email</Description>  \n<Source>  \n<DataModel>   \n<Path>Patient/EmailList[]</Path>  \n<TName>   \n<PropName>EmailAddress;eaddress</PropName>    \n<PropName>Type;emailtype</PropName>   \n</TName>  \n</DataModel>  \n<Query/>  \n<Utility/>    \n<APIURL/> \n</Source> \n</Parameter>  \n\n"
const patientWorkEmail = "<Parameter>   \n<PlaceHolder>(PatientWorkEmail)</PlaceHolder> \n<Description>Patient Work Email</Description> \n<Source>  \n<DataModel>   \n<Path>Patient/EmailList[type = \"work\"]</Path>   \n<TName>   \n<PropName>EmailAddress;eaddress</PropName>    \n<PropName>Type;emailtype</PropName>   \n</TName>  \n</DataModel>  \n<Query/>  \n<Utility/>    \n<APIURL/> \n</Source> \n</Parameter>  \n\n"
const patientWorkEmail2 = "<Parameter>  \n<PlaceHolder>(PatientWorkEmail)</PlaceHolder> \n<Description>Patient Work Email</Description> \n<Source>  \n<DataModel>   \n<Path>Patient/EmailList[]/EmailAddress</Path> \n<TName>   \n<PropName>EmailAddress;eaddress</PropName>    \n</TName>  \n</DataModel>  \n<Query/>  \n<Utility/>    \n<APIURL/> \n</Source> \n</Parameter>  \n\n"
const appointmentId = "<Parameter>  \n<PlaceHolder>(AppointmentId)</PlaceHolder>    \n<Description>AppointmentId</Description>  \n<Source>  \n<DataModel>   \n<Path>Appointment/Id</Path>   \n<TName/>  \n</DataModel>  \n<Query/>  \n<Utility/>    \n<APIURL/> \n</Source> \n</Parameter>  \n\n"
const appointmentDateTime = "<Parameter>    \n<PlaceHolder>(AppointmentDateTime)</PlaceHolder>    \n<Description>Appointment Date Time</Description>    \n<Source>    \n<DataModel> \n<Path>Appointment/DateTime</Path>   \n<TName/>    \n</DataModel>    \n<Query/>    \n<Utility/>  \n<APIURL/>   \n</Source> \n</Parameter>  \n\n"
const doctorId = "<Parameter>   \n<PlaceHolder>(DoctorId)</PlaceHolder> \n<Description>Doctor Identifier</Description>  \n<Source>  \n<DataModel>   \n<Path>Doctor/Id</Path>    \n<TName/>  \n</DataModel>  \n<Query/>  \n<Utility/>    \n<APIURL/> \n</Source> \n</Parameter>  \n\n"
const branchId = "<Parameter>   \n<PlaceHolder>(BranchId)</PlaceHolder>  \n<Description>Branch Identifier</Description>  \n<Source> \n<DataModel> \n<Path>Branch/Id</Path>  \n<TName/>    \n</DataModel>    \n<Query/>    \n<Utility/>  \n<APIURL/>   \n</Source> \n</Parameter>  \n\n"

export const templates = {
    0: patientName,
    1: patientMobileNumber,
    2: patientEmail,
    3: patientWorkEmail,
    4: patientWorkEmail2,
    5: appointmentId,
    6: appointmentDateTime,
    7: doctorId,
    8: branchId,
};

export const templatesLabels = [
    'Patient Name',
    'Patient Mobile Number',
    'Patient Email',
    'Patient Work Email',
    'Patient Work Email2',
    'Appointment Id',
    'Appointment Date/Time',
    'Doctor ID',
    'Branch ID'
];

