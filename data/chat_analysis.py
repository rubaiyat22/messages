import json
from datetime import datetime, time
from collections import defaultdict
import re, string


def count_over_all_time(messages):
    count_per_day = defaultdict(int)
    for msg in messages:
        content = msg.get('content')
        if content:
            ts = msg['timestamp_ms']/1000
            date = str(datetime.fromtimestamp(ts).date())
            count_per_day[date] += 1

    count_per_day = sorted(count_per_day.items())
    list_of_dicts = []
    for item in count_per_day:
        item = {'date': item[0], 'count': item[1]}
        list_of_dicts.append(item)
    #count_per_day = [{date: count} for date, count in count_per_day]
    return list_of_dicts

def when_most_active(messages):
    t0 = time(0)
    t1 = time(6)
    t2 = time(12)
    t3 = time(18)
    t4 = time(23, 59)
    time_of_day = defaultdict(int)
    for msg in messages:
        ts = msg['timestamp_ms']/1000
        t = datetime.fromtimestamp(ts).time()
        if t > t0 and t <= t1:
            time_of_day[t0] += 1
        elif t > t1 and t <=t2:
            time_of_day[t1] += 1
        elif t > t2 and t <= t3:
            time_of_day[t2] += 1
        else:
            time_of_day[t3] += 1

    time_of_day = sorted(time_of_day.items())
    print(time_of_day)
    x = [str (time[0]) for time in time_of_day]
    x.append(str(t4))
    y = [count[1] for count in time_of_day]
    return x, y


def main(file):
    with open (file, 'r') as f:
        data = json.load(f)
    msgs = data['messages']
    #count = 0
    #for msg in msgs:
        #ts = msg['timestamp_ms']/1000
        #date = datetime.fromtimestamp(ts).date()
        #if date == datetime(2018, 8, 29).date():
            #print msg.get('content')
    counts = count_over_all_time(msgs)
    with open ('counts.json', 'w') as f:
        json.dump(counts, f)
    #dates = [str(count[0]) for count in counts]
    #message_counts = [count[1] for count in counts]

    #output_file('count_over_time.html')
    #plot = figure(title='Our talks over time', x_axis_label='Date',
                  #y_axis_label='Message count', x_range=dates)
    #plot.line(x=dates, y=message_counts, legend='Message count', line_width=2)
    #show(plot)

    # word_counter = {}
    # for msg in msgs:
        # print(msg)
        # content = msg.get('content')
        # if content:
            # for word in content.split():
                # if word.lower() not in ignore_words:
                    # word_counter[word.lower()] = word_counter.get(word.lower(), 0) + 1

    # sorted_words = sorted(word_counter.items(), key=lambda k:word_counter[k])
    # max_word = max(word_counter, key=lambda k: word_counter[k])
    # print(max_word)
    # print('aaag')

    #times, message_count = when_most_active(msgs)
    #print (times)
    #print (message_count)

    #message count per person
    #participant_message_count = defaultdict(int)
    #for msg in msgs:
        #participant_message_count[msg['sender_name']] += 1
    #print (participant_message_count)

    #longeset message
    longest_message_sender = None
    longest_message = None
    message_length = 0
    by_length = sorted([msg.get('content', '') for msg in msgs], key=len, reverse=True)
    # for msg in msgs:
        # if len(str(msg.get('content'))) > message_length:
            # longest_message = str(msg.get('content'))
            # message_length = len(longest_message)
            # longest_message_sender = msg['sender_name']

    # print (longest_message_sender, longest_message)

    #how many times did you say word
    #word_to_count = defaultdict(int)
    #for msg in msgs:
        #content = msg.get('content')
        #if content:
            #table = content.maketrans(dict.fromkeys(string.punctuation))
            #content = content.translate(table)
            #for word in content.split():
                #word_to_count[word.lower()] += 1
    #print (word_to_count)

    #search bar
    # day_to_messages = None
    # for msg in msgs:
        # content = msg.get('content')
        # if content:
            # ts = msg['timestamp_ms']/1000
            # date = datetime.fromtimestamp(ts).date()





if __name__ == "__main__":
    main("message.json")
