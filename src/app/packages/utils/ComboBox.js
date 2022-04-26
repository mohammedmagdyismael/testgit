import React from 'react';
import { Country, Text, Image } from '@vezeeta/web-components';
import _ from 'lodash';
import { Flex } from 'grid-styled';
import { Cookie } from '@vezeeta/web-utils';

import { getDayOfWeekFromDate } from './Helpers';

let language;
if (Cookie.get(Cookie.LANGUAGE)) {
  language = Cookie.get(Cookie.LANGUAGE);
} else {
  Cookie.set(Cookie.LANGUAGE, 'en');
  language = 'en';
}

const createOption = (label, value, img, key, disabled, groupBy, groupIcon, searchable) => ({
  fieldValue: label,
  value,
  searchable: searchable || [label],
  fieldImage: img,
  key,
  children: label,
  disabled,
  groupBy,
  groupIcon,
});

const createCountriesOption = (DialCode, value, CountryName, IconUrl, isoCode) => ({
  fieldValue: DialCode,
  value: `${value}`,
  key: isoCode,
  searchable: [CountryName, DialCode],
  fieldImage: IconUrl,
  children: <Country flag={IconUrl} language={language} name={`${CountryName} (${DialCode})`} />,
});

export const getVisitTypesOptions = visitTypes =>
  visitTypes.map(visitType => createOption(visitType.name, visitType.value));

export const getCountryCodeOptions = (countries, key = 'IsoCode') => {
  if (countries) {
    return countries.map(country =>
      createCountriesOption(
        country.DialCode,
        country[key],
        language === 'en' ? country.CountryName : country.CountryNameArabic || country.CountryName,
        country.IconUrl,
        country.IsoCode,
      ),
    );
  }

  return [];
};

export const getCountriesOptions = countries => {
  if (countries) {
    const options = countries.map(country => createOption(country.NameEnglish, country.CountryId));

    return options;
  }
  return [];
};

export const getNationalitiesOptions = nationalities => {
  if (nationalities) {
    const options = nationalities.map(nationality =>
      createOption(
        language === 'en' ? nationality.nationalityNameEnglish : nationality.nationalityNameArabic,
        nationality.CountryId,
        null,
        null,
        null,
        null,
        null,
        [nationality.nationalityNameEnglish, nationality.nationalityNameArabic],
      ),
    );

    return options;
  }
  return [];
};

export const getCitiesOptions = cities => {
  if (cities) {
    const options = cities.map(city =>
      createOption(city.LanguageItemModels.find(modal => modal.LanguageId === 1).Name, city.Id),
    );

    return options;
  }
  return [];
};

export const getAreasOptions = areas => {
  if (areas) {
    const options = areas.map(area =>
      createOption(area.LanguageItemModels.find(modal => modal.LanguageId === 1).Name, area.Id),
    );

    return options;
  }
  return [];
};

export const getBranchesOptions = (branches, insertSelectAllOption) => {
  if (branches && branches.length !== 0) {
    const branchesOptions = branches.map(branch =>
      createOption(
        branch.BranchName || branch.NameEnglish,
        branch.BranchKey || branch.EntityKey,
        null,
        branch.BranchKey || branch.EntityKey,
        branch.disabled,
      ),
    );

    if (insertSelectAllOption) {
      branchesOptions.unshift(createOption(language === 'en' ? 'All Branches' : 'كل الفروع', -1));
    }

    return branchesOptions;
  }
  return undefined;
};

export const getServicesOptions = (services, insertSelectAllOption) => {
  if (services && services.length !== 0) {
    const servicesOptions = services.map(service =>
      createOption(service.name, service.serviceId, null, service.serviceKey, service.disabled),
    );

    if (insertSelectAllOption) {
      servicesOptions.unshift(createOption('All Services', -1));
    }

    return servicesOptions;
  }
  return undefined;
};

export const getUnitsOptions = (units, insertSelectAllOption) => {
  if (units && units.length !== 0) {
    const unitsOptions = units.map(unit =>
      createOption(unit.name, unit.unitId, null, unit.unitKey, unit.disabled),
    );

    if (insertSelectAllOption) {
      unitsOptions.unshift(createOption('All Services', -1));
    }

    return unitsOptions;
  }
  return undefined;
};

export const getRoomsOptions = (rooms, insertSelectAllOption) => {
  if (rooms && rooms.length !== 0) {
    const roomsOptions = rooms.map(room =>
      createOption(room.RoomName, room.RoomKey, null, room.RoomKey, room.disabled),
    );

    if (insertSelectAllOption) {
      roomsOptions.unshift(createOption('All rooms', -1));
    }

    return roomsOptions;
  }
  return undefined;
};

export const getDoctorsOptions = (doctors, insertSelectAllOption) => {
  if (doctors && doctors.length !== 0) {
    const filteredDoctors = doctors.filter(doctor => doctor !== undefined);
    const uniqDoctors = _.uniqBy(filteredDoctors, doctor => doctor.AccountKey);
    const doctorsOptions = uniqDoctors.map(doctor => {
      const doctorMainSpecialty = doctor.MainSpecialty || {};
      return createOption(
        doctor.DoctorName,
        doctor.AccountKey,
        null,
        doctor.AccountKey,
        false,
        doctorMainSpecialty.SpecialityName,
        doctorMainSpecialty.specialityimageurl,
        [
          doctor.DoctorName,
          doctorMainSpecialty.SpecialityNameEnglish,
          doctorMainSpecialty.SpecialityNameArabic,
        ],
      );
    });

    doctorsOptions.sort((a, b) => a.groupBy.localeCompare(b.groupBy));

    if (insertSelectAllOption) {
      doctorsOptions.unshift(createOption(language === 'en' ? 'All doctors' : 'كل الاطباء', -1));
    }

    return doctorsOptions;
  }
  return undefined;
};

export const getItemName = (itemModels, key, itemKey = 'Name') => {
  let itemName;
  itemModels[key].map(item => {
    if (language === 'en') {
      if (item.LanguageId === 1) {
        itemName = item[itemKey];
      }
      return undefined;
    } else if (language === 'ar') {
      if (item.LanguageId === 2) {
        itemName = item[itemKey];
      }
      return undefined;
    }
    return undefined;
  });
  return itemName;
};

export const getInsuranceOptions = insurances =>
  insurances.map(insurance =>
    createOption(
      getItemName(insurance, 'LanguageItemModels'),
      insurance.InsuranceKey,
      insurance.ImageUrl,
    ),
  );

export const getEntitesOptions = entities =>
  entities.map(entity =>
    createOption(entity.entityName || entity.NameEnglish, entity.entityKey || entity.EntityKey),
  );

export const getRelativesOptions = relatives => {
  if (relatives) {
    return relatives.map(relative => createOption(relative.Name, relative.RelativeTypeId));
  }
  return undefined;
};

export const getTimeSlotsOptions = timeSlots => {
  if (timeSlots) {
    return timeSlots.map((timeSlot, index) => {
      if (language !== 'en') {
        let { label } = timeSlot;
        if (label.includes('-')) {
          label = label.split('-');
          let from = label[0];
          let to = label[1];
          if (from.includes('PM')) {
            from = from.replace(' PM', '');
            from = from.split(':');
            let hours = Number(from[0]);
            hours = hours >= 12 ? hours : hours + 12;
            from = [`${hours}`, from[1]];
          } else {
            from = from.replace(' AM', '');
            from = from.split(':');
            let hours = Number(from[0]);
            hours = hours === 12 ? hours - 12 : hours;
            from = [`${hours}`, from[1]];
          }
          from = new Date(0, 0, 0, from[0], from[1]);
          from = from.toLocaleTimeString(`${language}-Eg`, {
            hour: '2-digit',
            hour12: true,
            minute: '2-digit',
          });
          if (to.includes('PM')) {
            to = to.replace(' PM', '');
            to = to.split(':');
            let hours = Number(to[0]);
            hours = hours >= 12 ? hours : hours + 12;
            to = [`${hours}`, to[1]];
          } else {
            to = to.replace(' AM', '');
            to = to.split(':');
            let hours = Number(to[0]);
            hours = hours === 12 ? hours - 12 : hours;
            to = [`${hours}`, to[1]];
          }
          to = new Date(0, 0, 0, to[0], to[1]);
          to = to.toLocaleTimeString(`${language}-Eg`, {
            hour: '2-digit',
            hour12: true,
            minute: '2-digit',
          });
          return createOption(`${from} - ${to}`, timeSlot.value, null, `t${index + 1}`);
        }
        if (label.includes('PM')) {
          label = label.replace(' PM', '');
          label = label.split(':');
          let hours = Number(label[0]);
          hours = hours >= 12 ? hours : hours + 12;
          label = [`${hours}`, label[1]];
        } else {
          label = label.replace(' AM', '');
          label = label.split(':');
          let hours = Number(label[0]);
          hours = hours === 12 ? hours - 12 : hours;
          label = [`${hours}`, label[1]];
        }
        label = new Date(0, 0, 0, label[0], label[1]);
        label = label.toLocaleTimeString(`${language}-Eg`, {
          hour: '2-digit',
          hour12: true,
          minute: '2-digit',
        });
        return createOption(label, timeSlot.value, null, `t${index + 1}`);
      }
      return createOption(timeSlot.label, timeSlot.value, null, `t${index + 1}`);
    });
  }
  return undefined;
};

export const getTimeSelectInWorkingHours = (date, workingHours, roomType) => {
  const dayOfWeek = getDayOfWeekFromDate(new Date(date));

  const dayWorkingHours = workingHours.find(day => day.DayOfWeek === dayOfWeek);

  const options = [];
  if (roomType === 1) {
    const startOfDay = new Date('1970-01-01T00:00:00');
    const endOfDay = new Date('1970-01-01T23:59:00');
    if (dayWorkingHours && dayWorkingHours.DayShifts.length > 0) {
      dayWorkingHours.DayShifts.forEach(shift => {
        const startTime = new Date(`1970-01-01T${shift.StartTime}`);
        const endTime = new Date(`1970-01-01T${shift.EndTime}`);
        const startHour = startTime.getHours();
        const endHour = endTime.getHours();
        for (let h = startHour; h <= endHour; h += 1) {
          const startMinute = h === startHour ? startTime.getMinutes() : 0;
          const endMinute = h === endHour ? endTime.getMinutes() : 60;
          for (let m = startMinute; m < endMinute; m += shift.SlotDuration) {
            const timeZone = h < 12 ? 'AM' : 'PM';
            const hours = h < 12 ? h : h - 12;
            const hoursValue = h < 10 ? `0${h}` : h;
            const minutes = m < 10 ? `0${m}` : m;
            const timeLabel = `${hours}:${minutes} ${timeZone}`;
            const timeValue = `${hoursValue}:${minutes}:00`;

            options.push(createOption(timeLabel, timeValue));
          }
        }
      });
    } else {
      const startHourOfDay = startOfDay.getHours();
      const endHourOfDay = endOfDay.getHours();
      for (let h = startHourOfDay; h <= endHourOfDay; h += 1) {
        const startMinute = h === startHourOfDay ? startOfDay.getMinutes() : 0;
        const endMinute = h === endHourOfDay ? endOfDay.getMinutes() : 60;
        for (let m = startMinute; m < endMinute; m += 15) {
          const timeZone = h < 12 ? 'AM' : 'PM';
          const hours = h < 12 ? h : h - 12;
          const hoursValue = h < 10 ? `0${h}` : h;
          const minutes = m < 10 ? `0${m}` : m;
          const timeLabel = `${hours}:${minutes} ${timeZone}`;
          const timeValue = `${hoursValue}:${minutes}:00`;

          options.push(createOption(timeLabel, timeValue));
        }
      }
    }
  } else if (roomType === 2) {
    if (dayWorkingHours) {
      dayWorkingHours.DayShifts.forEach(shift => {
        const startTime = shift.StartTime.split(':');
        const timeZoneStart = startTime[0] < 12 ? 'AM' : 'PM';
        const hoursStart = startTime[0] < 12 ? startTime[0] : startTime[0] - 12;
        const endTime = shift.EndTime.split(':');
        const timeZoneEnd = endTime[0] < 12 ? 'AM' : 'PM';
        const hoursEnd = endTime[0] < 12 ? endTime[0] : endTime[0] - 12;
        const timeLabel = `${hoursStart}:${startTime[1]} ${timeZoneStart} - ${hoursEnd}:${
          endTime[1]
        } ${timeZoneEnd}`;
        const timeValue = shift.StartTime;
        options.push(createOption(timeLabel, timeValue));
      });
    }
  }
  if (options.length <= 0) {
    options.push({
      data: {
        placeholder: 'No Working Hours Found',
        value: 'No Working Hours Found',
        searchable: [],
      },
      component: 'No Working Hours Found',
    });
  }
  return options;
};

export const getPatientsOptions = patients =>
  patients.map(patient => createOption(patient.FullName, patient, null, patient.PatientKey));

/**
 * Create specialties list
 * @param {Array} specialties
 */
export const getSpecialtiesOptions = (specialties, showImage = true) =>
  specialties.map(speciality => ({
    children: (
      <Flex alignItems="center">
        {showImage && (
          <Image
            src={speciality.SpecialityImageUrl}
            radius={20}
            alt={
              language === 'en' ? speciality.SpecialityNameEnglish : speciality.SpecialityNameArabic
            }
            name={
              language === 'en' ? speciality.SpecialityNameEnglish : speciality.SpecialityNameArabic
            }
            borderRadius="0"
            objectFit="contain"
            m={language === 'en' ? '0 12px 0 0' : '0 0 0 12px'}
          />
        )}
        <Text>
          {language === 'en' ? speciality.SpecialityNameEnglish : speciality.SpecialityNameArabic}
        </Text>
      </Flex>
    ),
    value: speciality.SpecialityKey,
    fieldValue:
      language === 'en' ? speciality.SpecialityNameEnglish : speciality.SpecialityNameArabic,
    searchable: [speciality.SpecialityNameEnglish, speciality.SpecialityNameArabic],
  }));

export const ENTITY_TYPE = {
  CLINIC: 1,
  POLY_CLINIC: 2,
  DOCTOR: 3,
};

/**
 * Create specialties list
 * @param {Array} prefixTitles
 */
export const getPrefixTitlesOptions = (
  prefixTitles,
  entityType = ENTITY_TYPE.CLINIC,
  specialityKey,
) =>
  prefixTitles
    .map(prefixTitle => {
      if (
        prefixTitle.EntityTypeIds.includes(entityType) &&
        !prefixTitle.SpecialitiesException.includes(specialityKey) &&
        ((prefixTitle.SpecialtyKeys && prefixTitle.SpecialtyKeys.includes(specialityKey)) ||
          prefixTitle.ApplyToAllSpecialities)
      ) {
        return createOption(
          getItemName(prefixTitle, 'PrefixTitleLanguageItemModels'),
          prefixTitle.PrefixTitleId,
        );
      }

      return null;
    })
    .filter(prefixTitle => prefixTitle !== null);

/**
 * Create professional titles list
 * @param {Array} professionalTitles
 */
export const getProfessionalTitlesOptions = (professionalTitles, specialityKey) =>
  professionalTitles
    .map(professionalTitle => {
      if (!professionalTitle.SpecialitiesException.includes(specialityKey)) {
        const title = getItemName(professionalTitle, 'DoctorTitleLanguageItemModels');
        return {
          children: title,
          value: professionalTitle.DoctorTitleId,
          fieldValue: title,
          searchable: [title],
        };
      }
      return null;
    })
    .filter(professionalTitle => professionalTitle !== null);
