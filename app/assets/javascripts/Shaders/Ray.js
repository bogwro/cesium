// This file is automatically rebuilt by the Cesium build process.
/*global define*/
define(function() {
    "use strict";
    return "const int czm_raySegmentCollectionCapacity = 4;\n\
struct czm_raySegmentCollection\n\
{\n\
czm_raySegment intervals[czm_raySegmentCollectionCapacity];\n\
int count;\n\
};\n\
czm_raySegmentCollection czm_raySegmentCollectionNew()\n\
{\n\
czm_raySegment intervals[czm_raySegmentCollectionCapacity];\n\
czm_raySegmentCollection i = czm_raySegmentCollection(intervals, 0);\n\
return i;\n\
}\n\
czm_raySegmentCollection czm_raySegmentCollectionNew(czm_raySegment segment)\n\
{\n\
czm_raySegment intervals[czm_raySegmentCollectionCapacity];\n\
intervals[0] = segment;\n\
czm_raySegmentCollection i = czm_raySegmentCollection(intervals, 1);\n\
return i;\n\
}\n\
czm_raySegmentCollection czm_raySegmentCollectionNew(czm_raySegment first, czm_raySegment second)\n\
{\n\
czm_raySegment intervals[czm_raySegmentCollectionCapacity];\n\
intervals[0] = first;\n\
intervals[1] = second;\n\
czm_raySegmentCollection i = czm_raySegmentCollection(intervals, 2);\n\
return i;\n\
}\n\
void czm_removeAt(inout czm_raySegmentCollection collection, int index)\n\
{\n\
--collection.count;\n\
for (int i = 0; i < czm_raySegmentCollectionCapacity; ++i)\n\
{\n\
if (i >= index && i < collection.count)\n\
{\n\
collection.intervals[i] = collection.intervals[i + 1];\n\
}\n\
else if (i == collection.count)\n\
{\n\
break;\n\
}\n\
}\n\
}\n\
void czm_insertAt(inout czm_raySegmentCollection collection, czm_raySegment segment, int index)\n\
{\n\
for (int i = czm_raySegmentCollectionCapacity - 1; i >= 0; --i)\n\
{\n\
if (i <= collection.count && i > index)\n\
{\n\
collection.intervals[i] = collection.intervals[i - 1];\n\
}\n\
else if (i == index)\n\
{\n\
collection.intervals[i] = segment;\n\
}\n\
else if (i < index)\n\
{\n\
break;\n\
}\n\
}\n\
++collection.count;\n\
}\n\
void czm_insertAt(inout czm_raySegmentCollection collection, czm_raySegmentCollection segments, int index)\n\
{\n\
if (segments.count == 1)\n\
{\n\
czm_insertAt(collection, segments.intervals[0], index);\n\
}\n\
else\n\
{\n\
for (int i = czm_raySegmentCollectionCapacity - 1; i >= 0; --i)\n\
{\n\
if (i < segments.count)\n\
{\n\
czm_insertAt(collection, segments.intervals[i], index);\n\
}\n\
}\n\
}\n\
}\n\
void czm_complement(czm_raySegment segment, out czm_raySegmentCollection collection)\n\
{\n\
if (czm_isEmpty(segment))\n\
{\n\
collection = czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
}\n\
else if (segment.stop == czm_infinity)\n\
{\n\
if (segment.start == 0.0)\n\
{\n\
collection = czm_raySegmentCollectionNew();\n\
}\n\
else\n\
{\n\
collection = czm_raySegmentCollectionNew(czm_raySegment(0.0, segment.start));\n\
}\n\
}\n\
else if (segment.start == 0.0)\n\
{\n\
collection = czm_raySegmentCollectionNew(czm_raySegment(segment.stop, czm_infinity));\n\
}\n\
else\n\
{\n\
czm_raySegment head = czm_raySegment(0.0, segment.start);\n\
czm_raySegment tail = czm_raySegment(segment.stop, czm_infinity);\n\
collection = czm_raySegmentCollectionNew(head, tail);\n\
}\n\
}\n\
czm_raySegmentCollection czm_complement(czm_raySegmentCollection collection)\n\
{\n\
if (collection.count == 0)\n\
{\n\
czm_raySegmentCollection result = czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
return result;\n\
}\n\
else if (collection.count == 1)\n\
{\n\
czm_raySegmentCollection result;\n\
czm_complement(collection.intervals[0], result);\n\
return result;\n\
}\n\
czm_raySegmentCollection result = czm_raySegmentCollectionNew();\n\
for (int i = 0; i < czm_raySegmentCollectionCapacity; ++i)\n\
{\n\
if (i < collection.count)\n\
{\n\
float start = collection.intervals[i].stop;\n\
if (i < collection.count - 1)\n\
{\n\
float stop = collection.intervals[i + 1].start;\n\
result.intervals[i] = czm_raySegment(start, stop);\n\
++result.count;\n\
}\n\
else if (start != czm_infinity)\n\
{\n\
result.intervals[i] = czm_raySegment(start, czm_infinity);\n\
++result.count;\n\
}\n\
}\n\
else\n\
{\n\
break;\n\
}\n\
}\n\
if (collection.count > 0)\n\
{\n\
float stop = collection.intervals[0].start;\n\
if (stop != 0.0)\n\
{\n\
czm_insertAt(result, czm_raySegment(0.0, stop), 0);\n\
}\n\
}\n\
return result;\n\
}\n\
czm_raySegmentCollection czm_union(czm_raySegment left, czm_raySegment right)\n\
{\n\
if (czm_isFull(left) || czm_isFull(right))\n\
{\n\
czm_raySegmentCollection result = czm_raySegmentCollectionNew(czm_fullRaySegment);\n\
return result;\n\
}\n\
float stop = min(left.stop, right.stop);\n\
float start = max(left.start, right.start);\n\
if (stop < start)\n\
{\n\
czm_raySegmentCollection result = (left.start < right.start) ? czm_raySegmentCollectionNew(left, right) : czm_raySegmentCollectionNew(right, left);\n\
return result;\n\
}\n\
czm_raySegmentCollection result = czm_raySegmentCollectionNew(czm_raySegment(min(left.start, right.start), max(left.stop, right.stop)));\n\
return result;\n\
}\n\
czm_raySegment czm_intersection(czm_raySegment left, czm_raySegment right)\n\
{\n\
float stop = min(left.stop, right.stop);\n\
if (stop < 0.0)\n\
{\n\
return czm_emptyRaySegment;\n\
}\n\
float start = max(left.start, right.start);\n\
if (stop < start)\n\
{\n\
return czm_emptyRaySegment;\n\
}\n\
czm_raySegment s = czm_raySegment(start, stop);\n\
return s;\n\
}\n\
czm_raySegmentCollection czm_intersection(czm_raySegmentCollection left, czm_raySegment right)\n\
{\n\
if (left.count == 1)\n\
{\n\
czm_raySegment intersection = czm_intersection(left.intervals[0], right);\n\
if (czm_isEmpty(intersection))\n\
{\n\
czm_raySegmentCollection result = czm_raySegmentCollectionNew();\n\
return result;\n\
}\n\
else\n\
{\n\
czm_raySegmentCollection result = czm_raySegmentCollectionNew(intersection);\n\
return result;\n\
}\n\
}\n\
czm_raySegmentCollection result = czm_raySegmentCollectionNew();\n\
for (int leftIndex = 0; leftIndex < czm_raySegmentCollectionCapacity; ++leftIndex)\n\
{\n\
if (leftIndex < left.count)\n\
{\n\
czm_raySegment intersection = czm_intersection(left.intervals[leftIndex], right);\n\
if (!czm_isEmpty(intersection))\n\
{\n\
czm_insertAt(result, intersection, result.count);\n\
}\n\
}\n\
else\n\
{\n\
break;\n\
}\n\
}\n\
return result;\n\
}\n\
czm_raySegmentCollection czm_intersection(czm_raySegmentCollection left, czm_raySegmentCollection right)\n\
{\n\
if (right.count == 1)\n\
{\n\
if (left.count == 1)\n\
{\n\
czm_raySegment intersection = czm_intersection(left.intervals[0], right.intervals[0]);\n\
if (czm_isEmpty(intersection))\n\
{\n\
czm_raySegmentCollection result = czm_raySegmentCollectionNew();\n\
return result;\n\
}\n\
else\n\
{\n\
czm_raySegmentCollection result = czm_raySegmentCollectionNew(intersection);\n\
return result;\n\
}\n\
}\n\
else\n\
{\n\
czm_raySegmentCollection result = czm_intersection(left, right.intervals[0]);\n\
return result;\n\
}\n\
}\n\
czm_raySegmentCollection result = czm_raySegmentCollectionNew();\n\
if (left.count > 0 && right.count > 0)\n\
{\n\
for (int leftIndex = 0; leftIndex < czm_raySegmentCollectionCapacity; ++leftIndex)\n\
{\n\
if (leftIndex < left.count)\n\
{\n\
for (int rightIndex = 0; rightIndex < czm_raySegmentCollectionCapacity; ++rightIndex)\n\
{\n\
if (rightIndex <= right.count && left.intervals[leftIndex].stop >= right.intervals[rightIndex].start)\n\
{\n\
czm_raySegment intersection = czm_intersection(left.intervals[leftIndex], right.intervals[rightIndex]);\n\
if (!czm_isEmpty(intersection))\n\
{\n\
czm_insertAt(result, intersection, result.count);\n\
}\n\
}\n\
else\n\
{\n\
break;\n\
}\n\
}\n\
}\n\
else\n\
{\n\
break;\n\
}\n\
}\n\
}\n\
return result;\n\
}\n\
czm_raySegmentCollection czm_subtraction(czm_raySegment outer, czm_raySegment inner)\n\
{\n\
czm_raySegmentCollection i = czm_raySegmentCollectionNew();\n\
czm_raySegment intersection = czm_intersection(outer, inner);\n\
if (czm_isEmpty(intersection) || (intersection.start == intersection.stop))\n\
{\n\
i.count = 1;\n\
i.intervals[0] = outer;\n\
}\n\
else\n\
{\n\
if ((intersection.start == outer.start) && (intersection.stop == outer.stop))\n\
{\n\
i.count = 0;\n\
}\n\
else if (intersection.start == outer.start)\n\
{\n\
i.count = 1;\n\
i.intervals[0] = czm_raySegment(inner.stop, outer.stop);\n\
}\n\
else if (intersection.stop == outer.stop)\n\
{\n\
i.count = 1;\n\
i.intervals[0] = czm_raySegment(outer.start, inner.start);\n\
}\n\
else\n\
{\n\
i.count = 2;\n\
i.intervals[0] = czm_raySegment(outer.start, inner.start);\n\
i.intervals[1] = czm_raySegment(inner.stop, outer.stop);\n\
}\n\
}\n\
return i;\n\
}\n\
czm_raySegmentCollection czm_subtraction(czm_raySegmentCollection left, czm_raySegment right)\n\
{\n\
if (left.count == 1)\n\
{\n\
czm_raySegmentCollection result = czm_subtraction(left.intervals[0], right);\n\
return result;\n\
}\n\
czm_raySegmentCollection result = czm_raySegmentCollectionNew();\n\
for (int leftIndex = 0; leftIndex < czm_raySegmentCollectionCapacity; ++leftIndex)\n\
{\n\
if (leftIndex < left.count)\n\
{\n\
czm_raySegmentCollection segments = czm_subtraction(left.intervals[leftIndex], right);\n\
if (segments.count != 0)\n\
{\n\
czm_insertAt(result, segments, result.count);\n\
}\n\
}\n\
else\n\
{\n\
break;\n\
}\n\
}\n\
return result;\n\
}\n\
czm_raySegmentCollection czm_subtraction(czm_raySegmentCollection left, czm_raySegmentCollection right)\n\
{\n\
if (right.count == 1)\n\
{\n\
if (left.count == 1)\n\
{\n\
czm_raySegmentCollection result = czm_subtraction(left.intervals[0], right.intervals[0]);\n\
return result;\n\
}\n\
else\n\
{\n\
czm_raySegmentCollection result = czm_subtraction(left, right.intervals[0]);\n\
return result;\n\
}\n\
}\n\
czm_raySegmentCollection complement = czm_complement(right);\n\
czm_raySegmentCollection result = czm_intersection(left, complement);\n\
return result;\n\
}\n\
";
});